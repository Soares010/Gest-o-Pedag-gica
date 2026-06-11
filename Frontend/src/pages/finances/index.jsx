import React, { useState } from "react";
import "../../assets/styles/Finances.css";
import { Sidebar } from "../../components/Sidebar";

export const Finances = () => {
  const [filtroMes, setFiltroMes] = useState("outubro");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lista de transações com o termo correto "Propina"
  const [transacoes, setTransacoes] = useState([
    {
      id: 1,
      data: "05 Out, 2023",
      descricao: "Propina - 10ª Classe A",
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
      descricao: "Propina - 12ª Classe B",
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
  ]);

  // Estado do formulário adaptado para o registo de propinas e despesas
  const [formTransacao, setFormTransacao] = useState({
    tipo: "receita", // receita = Propina, despesa = Geral
    aluno: "",
    classe: "10ª Classe A",
    mesReferencia: "Outubro",
    descricaoDespesa: "", // Usado apenas se for despesa
    valor: "",
    status: "concluido",
  });

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 2,
    }).format(valor);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormTransacao((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvarTransacao = (e) => {
    e.preventDefault();
    if (!formTransacao.valor) return;

    // Constrói a descrição dinamicamente baseado no tipo de fluxo
    let descricaoFinal = "";
    if (formTransacao.tipo === "receita") {
      descricaoFinal = `Propina (${formTransacao.mesReferencia}) - ${formTransacao.aluno} [${formTransacao.classe}]`;
    } else {
      descricaoFinal = formTransacao.descricaoDespesa || "Despesa Geral";
    }

    const novaTransacao = {
      id: Date.now(),
      data: "Hoje",
      descricao: descricaoFinal,
      tipo: formTransacao.tipo,
      valor: parseFloat(formTransacao.valor),
      status: formTransacao.status,
    };

    setTransacoes([novaTransacao, ...transacoes]);
    setIsModalOpen(false);

    // Reset do formulário
    setFormTransacao({
      tipo: "receita",
      aluno: "",
      classe: "10ª Classe A",
      mesReferencia: "Outubro",
      descricaoDespesa: "",
      valor: "",
      status: "concluido",
    });
  };

  return (
    <div className="finance-layout main-container">
      <Sidebar />
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
            <button className="btn btn--outline">Exportar PDF</button>
          </div>

          <button
            className="btn btn--primary btn--glass"
            onClick={() => setIsModalOpen(true)}
          >
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

      {/* KPIs Financeiros */}
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

        {/* <div className="finance-card finance-card--expense">
          <div className="finance-card__header">
            <span className="finance-card__label">Total de Despesas</span>
            <span className="finance-card__icon text-red">↓</span>
          </div>
          <h2 className="finance-card__value">{formatarMoeda(1850000)}</h2>
          <p className="finance-card__comparison negative">
            +5% em relação a Setembro
          </p>
        </div> */}

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

      {/* Conteúdo Principal */}
      <div className="finance-content-grid">
        <section className="finance-panel finance-panel--transactions">
          <div className="finance-panel__header">
            <h3 className="finance-panel__title">Transações Recentes</h3>
            {/* <button className="btn btn--text">Ver todas</button> */}
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
                {transacoes.map((item) => (
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

        {/* Estrutura de Custos */}
        {/* <section className="finance-panel finance-panel--summary">
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
        </section> */}
      </div>

      {/* =========================================
          MODAL ADAPTADA (Propina vs Despesa)
          ========================================= */}
      {isModalOpen && (
        <div
          className="finance-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="finance-modal" onClick={(e) => e.stopPropagation()}>
            <header className="finance-modal__header">
              <h3 className="finance-modal__title">Nova Transação</h3>
              <button
                className="finance-modal__close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </header>

            <form
              className="finance-modal__form"
              onSubmit={handleSalvarTransacao}
            >
              {/* Segmented Control Tipo de Movimentação */}
              <div className="form-group">
                <label className="form-group__label">Tipo de Fluxo</label>
                <div className="segmented-control">
                  <input
                    type="radio"
                    id="tipo-receita"
                    name="tipo"
                    value="receita"
                    checked={formTransacao.tipo === "receita"}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="tipo-receita"
                    className="segmented-control__button segmented-control__button--income"
                  >
                    Propina (Receita)
                  </label>

                  <input
                    type="radio"
                    id="tipo-despesa"
                    name="tipo"
                    value="despesa"
                    checked={formTransacao.tipo === "despesa"}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="tipo-despesa"
                    className="segmented-control__button segmented-control__button--expense"
                  >
                    Despesa
                  </label>
                </div>
              </div>

              {/* RENDERIZAÇÃO CONDICIONAL BASEADA NO TIPO DE FLUXO */}
              {formTransacao.tipo === "receita" ? (
                <>
                  {/* Nome do Aluno */}
                  <div className="form-group">
                    <label className="form-group__label" htmlFor="aluno">
                      Nome do Aluno
                    </label>
                    <input
                      type="text"
                      id="aluno"
                      name="aluno"
                      className="form-group__input"
                      placeholder="Ex: Anselmo Ralph"
                      value={formTransacao.aluno}
                      onChange={handleInputChange}
                      required
                      autoFocus
                    />
                  </div>

                  {/* Grid de Seleção Escolar */}
                  <div className="form-row-grid">
                    <div className="form-group">
                      <label className="form-group__label" htmlFor="classe">
                        Classe / Turma
                      </label>
                      <select
                        id="classe"
                        name="classe"
                        className="form-group__select"
                        value={formTransacao.classe}
                        onChange={handleInputChange}
                      >
                        <option value="10ª Classe A">10ª Classe A</option>
                        <option value="11ª Classe A">11ª Classe A</option>
                        <option value="12ª Classe A">12ª Classe A</option>
                        <option value="12ª Classe B">12ª Classe B</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label
                        className="form-group__label"
                        htmlFor="mesReferencia"
                      >
                        Mês de Referência
                      </label>
                      <select
                        id="mesReferencia"
                        name="mesReferencia"
                        className="form-group__select"
                        value={formTransacao.mesReferencia}
                        onChange={handleInputChange}
                      >
                        <option value="Janeiro">Janeiro</option>
                        <option value="Fevereiro">Fevereiro</option>
                        <option value="Março">Março</option>
                        <option value="Abril">Abril</option>
                        <option value="Maio">Maio</option>
                        <option value="Junho">Junho</option>
                        <option value="Julho">Julho</option>
                        <option value="Agosto">Agosto</option>
                        <option value="Setembro">Setembro</option>
                        <option value="Outubro">Outubro</option>
                        <option value="Novembro">Novembro</option>
                        <option value="Dezembro">Dezembro</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                /* Caso mude para Despesa, exibe o campo livre original */
                <div className="form-group">
                  <label
                    className="form-group__label"
                    htmlFor="descricaoDespesa"
                  >
                    Descrição da Despesa
                  </label>
                  <input
                    type="text"
                    id="descricaoDespesa"
                    name="descricaoDespesa"
                    className="form-group__input"
                    placeholder="Ex: Compra de Resmas A4"
                    value={formTransacao.descricaoDespesa}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              {/* Grid Comum para Valor e Status */}
              <div className="form-row-grid">
                <div className="form-group">
                  <label className="form-group__label" htmlFor="valor">
                    Valor Pago (AOA)
                  </label>
                  <input
                    type="number"
                    id="valor"
                    name="valor"
                    className="form-group__input font-medium"
                    placeholder="0,00"
                    value={formTransacao.valor}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label className="form-group__label" htmlFor="status">
                    Status Inicial
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="form-group__select"
                    value={formTransacao.status}
                    onChange={handleInputChange}
                  >
                    <option value="concluido">Concluído</option>
                    <option value="pendente">Pendente</option>
                  </select>
                </div>
              </div>

              {/* Rodapé de Ações */}
              <footer className="finance-modal__footer">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn--primary">
                  Registar Fluxo
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
