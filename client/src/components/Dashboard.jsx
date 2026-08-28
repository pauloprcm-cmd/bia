import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Dashboard = ({ tasks }) => {
  const importante = tasks.filter((t) => t.importante).length;
  const normal = tasks.filter((t) => !t.importante).length;

  const chartData = [
    { prioridade: "Importante", quantidade: importante },
    { prioridade: "Normal", quantidade: normal },
  ];

  // Tooltip customizado para respeitar o tema
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="dashboard-tooltip">
          <p className="dashboard-tooltip-label">{label}</p>
          <p className="dashboard-tooltip-value">
            {payload[0].value} tarefa{payload[0].value !== 1 ? "s" : ""}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2 className="dashboard-title">📊 Dashboard de Tarefas</h2>
        <p className="dashboard-subtitle">Distribuição por prioridade</p>
      </div>

      {tasks.length > 0 ? (
        <>
          <div className="dashboard-chart">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={chartData}
                margin={{ top: 16, right: 24, left: 0, bottom: 8 }}
                barCategoryGap="40%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border-color)"
                  vertical={false}
                />
                <XAxis
                  dataKey="prioridade"
                  tick={{ fill: "var(--text-secondary)", fontSize: 13 }}
                  axisLine={{ stroke: "var(--border-color)" }}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--bg-secondary)" }} />
                <Bar dataKey="quantidade" radius={[6, 6, 0, 0]}>
                  <Cell fill="var(--accent-success)" />
                  <Cell fill="var(--accent-primary)" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="dashboard-summary">
            <div className="dashboard-summary-item">
              <span className="dashboard-summary-dot" style={{ background: "var(--accent-success)" }} />
              <span className="dashboard-summary-label">Importante</span>
              <span className="dashboard-summary-value">{importante} tarefa{importante !== 1 ? "s" : ""}</span>
            </div>
            <div className="dashboard-summary-item">
              <span className="dashboard-summary-dot" style={{ background: "var(--accent-primary)" }} />
              <span className="dashboard-summary-label">Normal</span>
              <span className="dashboard-summary-value">{normal} tarefa{normal !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h3>Nenhuma tarefa para exibir 📊</h3>
          <p>Adicione tarefas na home para ver o gráfico aqui.</p>
        </div>
      )}

      <div className="dashboard-footer">
        <Link to="/" className="back-button">
          ← Voltar para Home
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
