#!/bin/bash
set -e

REGION="us-east-1"
ACCOUNT_ID="762397612249"
ECR_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/bia"
CLUSTER="cluster-bia"
SERVICE="service-bia"
TASK_FAMILY="task-def-bia"

COMMIT_HASH=$(git rev-parse --short=7 HEAD)
IMAGE="$ECR_URI:$COMMIT_HASH"

echo "==> Commit: $COMMIT_HASH"
echo "==> Imagem: $IMAGE"

# 1. Login ECR
aws ecr get-login-password --region $REGION | \
  docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# 2. Build e push com tag do commit
docker build -t $IMAGE .
docker push $IMAGE

# 3. Clonar task definition atual e trocar imagem
CURRENT=$(aws ecs describe-task-definition \
  --task-definition $TASK_FAMILY \
  --region $REGION \
  --query 'taskDefinition' \
  --output json)

NEW_DEF=$(echo "$CURRENT" | jq --arg img "$IMAGE" '
  .containerDefinitions[0].image = $img |
  del(.taskDefinitionArn,.revision,.status,.requiresAttributes,.compatibilities,.registeredAt,.registeredBy)
')

# 4. Registrar nova task definition
NEW_REVISION=$(echo "$NEW_DEF" | \
  aws ecs register-task-definition \
    --region $REGION \
    --cli-input-json file:///dev/stdin \
    --query 'taskDefinition.revision' \
    --output text)

echo "==> Task Definition: $TASK_FAMILY:$NEW_REVISION"

# 5. Atualizar serviço
aws ecs update-service \
  --region $REGION \
  --cluster $CLUSTER \
  --service $SERVICE \
  --task-definition $TASK_FAMILY:$NEW_REVISION > /dev/null

echo "==> Deploy iniciado. Task: $TASK_FAMILY:$NEW_REVISION | Imagem: $COMMIT_HASH"
