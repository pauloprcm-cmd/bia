#!/bin/bash
set -e

REGION="us-east-1"
ACCOUNT_ID="762397612249"
ECR_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/bia"
CLUSTER="cluster-bia"
SERVICE="service-bia"
TASK_FAMILY="task-def-bia"

COMMIT_HASH="$1"

if [ -z "$COMMIT_HASH" ]; then
  echo "Uso: $0 <commit-hash>"
  exit 1
fi

IMAGE="$ECR_URI:$COMMIT_HASH"

# Verificar se a imagem existe no ECR
aws ecr describe-images \
  --region $REGION \
  --repository-name bia \
  --image-ids imageTag=$COMMIT_HASH \
  --query 'imageDetails[0].imageTags' \
  --output text > /dev/null

echo "==> Rollback para commit: $COMMIT_HASH"
echo "==> Imagem: $IMAGE"

# Clonar task definition atual e trocar imagem
CURRENT=$(aws ecs describe-task-definition \
  --task-definition $TASK_FAMILY \
  --region $REGION \
  --query 'taskDefinition' \
  --output json)

NEW_DEF=$(echo "$CURRENT" | jq --arg img "$IMAGE" '
  .containerDefinitions[0].image = $img |
  del(.taskDefinitionArn,.revision,.status,.requiresAttributes,.compatibilities,.registeredAt,.registeredBy)
')

TMPFILE=$(mktemp /tmp/task-def-XXXXXX.json)
echo "$NEW_DEF" > "$TMPFILE"

NEW_REVISION=$(aws ecs register-task-definition \
  --region $REGION \
  --cli-input-json "file://$TMPFILE" \
  --query 'taskDefinition.revision' \
  --output text)

rm -f "$TMPFILE"

aws ecs update-service \
  --region $REGION \
  --cluster $CLUSTER \
  --service $SERVICE \
  --task-definition $TASK_FAMILY:$NEW_REVISION > /dev/null

echo "==> Rollback iniciado. Task: $TASK_FAMILY:$NEW_REVISION | Imagem: $COMMIT_HASH"
