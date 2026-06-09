import React, { useState } from "react";
import "./gestao-financeira.css";

export const Finances = () => {
  const [filtroMes, setFiltroMes] = useState("outubro");

  // Dados simulados de transações recentes (Valores em Kwanza)
  const transacoesData = [
    {
      id: 1,
      data: "05 Out, 2023",
      descricao: "Mensalidade - 10ª Classe A",
      tipo: "receita",
      valor: 35000,
      status: "concluido",
    },
    {
      id: 2,
      data: "04 Out, 2023",
      descricao: "Pagamento de Salários - Docentes",
      tipo: "despesa",
      valor: 1250000,
      status: "concluido",
    },
    {
      id: 3,
      data: "02 Out, 2023",
      descricao: "Manutenção de Servidores",
      tipo: "despesa",
      valor: 85000,
      status: "pendente",
    },
    {
      id: 4,
      data: "01 Out, 2023",
      descricao: "Mensalidade - 12ª Classe B",
      tipo: "receita",
      valor: 42000,
      status: "concluido",
    },
    {
      id: 5,
      data: "28 Set, 2023",
      descricao: "Compra de Material de Escritório",
      tipo: "despesa",
      valor: 150000,
      status: "concluido",
    },
  ];

  // Função utilitária para formatar moeda
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 2,
    }).format(valor);
  };

  return (
    <div className="finance-layout">
      {/* Cabeçalho */}
      <header className="finance-header">
        <div className="finance-header__info">
          <h1 className="finance-header__title">Gestão Financeira</h1>
          <p className="finance-header__subtitle">
            Visão geral do fluxo de caixa e transações
          </p>
        </div>

        <div className="finance-header__actions">
          <div className="finance-controls">
            <select
              className="finance-controls__select"
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
            >
              <option value="setembro">Setembro 2023</option>
              <option value="outubro">Outubro 2023</option>
              <option value="novembro">Novembro 2023</option>
            </select>
            <button className="btn btn--outline">Exportar Excel</button>
          </div>

          <button className="btn btn--primary btn--glass">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nova Transação
          </button>
        </div>
      </header>

      {/* KPIs Financeiros com Glassmorphism sutil */}
      <section className="finance-kpi-grid">
        <div className="finance-card finance-card--income">
          <div className="finance-card__header">
            <span className="finance-card__label">Total de Receitas</span>
            <span className="finance-card__icon text-green">↑</span>
          </div>
          <h2 className="finance-card__value">{formatarMoeda(4500000)}</h2>
          <p className="finance-card__comparison positive">
            +12% em relação a Setembro
          </p>
        </div>

        <div className="finance-card finance-card--expense">
          <div className="finance-card__header">
            <span className="finance-card__label">Total de Despesas</span>
            <span className="finance-card__icon text-red">↓</span>
          </div>
          <h2 className="finance-card__value">{formatarMoeda(1850000)}</h2>
          <p className="finance-card__comparison negative">
            +5% em relação a Setembro
          </p>
        </div>

        <div className="finance-card finance-card--balance">
          <div className="finance-card__header">
            <span className="finance-card__label">Saldo Atual</span>
            <span className="finance-card__icon text-purple">~</span>
          </div>
          <h2 className="finance-card__value">{formatarMoeda(2650000)}</h2>
          <p className="finance-card__comparison neutral">
            Atualizado hoje às 08:00
          </p>
        </div>

        <div className="finance-card finance-card--alert">
          <div className="finance-card__header">
            <span className="finance-card__label">Inadimplência</span>
            <span className="finance-card__icon text-orange">!</span>
          </div>
          <h2 className="finance-card__value">{formatarMoeda(420000)}</h2>
          <p className="finance-card__comparison negative">
            15 alunos com atraso
          </p>
        </div>
      </section>

      {/* Gráfico (Mockup em CSS) e Transações Recentes */}
      <div className="finance-content-grid">
        {/* Painel de Transações */}
        <section className="finance-panel finance-panel--transactions">
          <div className="finance-panel__header">
            <h3 className="finance-panel__title">Transações Recentes</h3>
            <button className="btn btn--text">Ver todas</button>
          </div>

          <div className="finance-table-wrapper">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transacoesData.map((item) => (
                  <tr key={item.id}>
                    <td className="finance-table__date">{item.data}</td>
                    <td className="finance-table__desc">
                      <span
                        className={`transaction-dot transaction-dot--${item.tipo}`}
                      ></span>
                      {item.descricao}
                    </td>
                    <td
                      className={`finance-table__amount ${item.tipo === "receita" ? "text-green" : ""}`}
                    >
                      {item.tipo === "receita" ? "+" : "-"}{" "}
                      {formatarMoeda(item.valor)}
                    </td>
                    <td>
                      <span className={`status-tag status-tag--${item.status}`}>
                        {item.status === "concluido" ? "Concluído" : "Pendente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Painel de Resumo Rápido */}
        <section className="finance-panel finance-panel--summary">
          <div className="finance-panel__header">
            <h3 className="finance-panel__title">Estrutura de Custos</h3>
          </div>

          <div className="cost-breakdown">
            <div className="cost-item">
              <div className="cost-item__info">
                <span>Folha de Pagamento</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{
                    width: "65%",
                    backgroundColor: "var(--color-primary)",
                  }}
                ></div>
              </div>
            </div>

            <div className="cost-item">
              <div className="cost-item__info">
                <span>Manutenção e Infra</span>
                <span className="font-medium">20%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{ width: "20%", backgroundColor: "#64748B" }}
                ></div>
              </div>
            </div>

            <div className="cost-item">
              <div className="cost-item__info">
                <span>Marketing e Outros</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{ width: "15%", backgroundColor: "#94A3B8" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="quick-action-box">
            <h4>Fechamento do Dia</h4>
            <p>Realize o balanço do caixa diário.</p>
            <button className="btn btn--secondary w-100">
              Iniciar Fechamento
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
