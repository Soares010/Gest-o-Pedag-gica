import React, { useState } from "react";
import "../../assets/styles/Manager.css";
import { Sidebar } from "../../components/Sidebar";

export const Manager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados simulados para a tabela
  const turmasData = [
    {
      id: 1,
      nome: "10ª A - Ciências",
      regente: "Manuel Antunes",
      alunos: 32,
      media: "15.4",
      status: "excelente",
    },
    {
      id: 2,
      nome: "11ª B - Informática",
      regente: "Carla Mendes",
      alunos: 28,
      media: "12.8",
      status: "atencao",
    },
    {
      id: 3,
      nome: "12ª A - Economia",
      regente: "José Silva",
      alunos: 30,
      media: "16.1",
      status: "excelente",
    },
    {
      id: 4,
      nome: "9ª C - Geral",
      regente: "Beatriz Lucas",
      alunos: 35,
      media: "11.2",
      status: "critico",
    },
  ];

  return (
    <div className="pedagogical-layout main-container">
      <Sidebar />
      {/* Cabeçalho da Página e Filtros */}
      <header className="dashboard-header">
        <div className="dashboard-header__title-group">
          <h1 className="dashboard-header__title">Gestão Pedagógica</h1>
          <p className="dashboard-header__subtitle">
            Monitoramento de turmas e desempenho acadêmico
          </p>
        </div>

        <div className="dashboard-header__actions">
          <div className="dashboard-filters">
            {/* <div className="form-group form-group--inline">
              <select className="form-group__input" defaultValue="2023/2024">
                <option value="2023/2024">Ano lectivo: 2023/2024</option>
                <option value="2022/2023">Ano lectivo: 2022/2023</option>
              </select>
            </div> */}
            <div className="form-group form-group--inline">
              <select className="form-group__input" defaultValue="geral">
                <option value="geral">Visão: Geral</option>
                <option value="ciencias">Ciências Exatas</option>
                <option value="humanas">Ciências Humanas</option>
              </select>
            </div>
            <button className="button button--secondary">
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
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filtrar
            </button>
          </div>

          {/* Botão de Cadastrar Pedagógico */}
          <button
            className="button button--primary"
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
            Novo Membro
          </button>
        </div>
      </header>

      {/* Cartões de KPI */}
      <section className="kpi-grid">
        {/* <div className="kpi-card">
          <span className="kpi-card__label">Média Institucional</span>
          <div className="kpi-card__value-group">
            <h2 className="kpi-card__value">14.2</h2>
            <span className="kpi-card__trend kpi-card__trend--up">↑ 0.5</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-card__label">Taxa de Assiduidade</span>
          <div className="kpi-card__value-group">
            <h2 className="kpi-card__value">92%</h2>
            <span className="kpi-card__trend kpi-card__trend--up">↑ 2%</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-card__label">Alunos em Risco</span>
          <div className="kpi-card__value-group">
            <h2 className="kpi-card__value">45</h2>
            <span className="kpi-card__trend kpi-card__trend--down">↓ 12</span>
          </div>
        </div> */}

        <div className="kpi-card" style={{width: "300px"}}>
          <span className="kpi-card__label">Total de Alunos (Ativos)</span>
          <div className="kpi-card__value-group">
            <h2 className="kpi-card__value">1.240</h2>
          </div>
        </div>
      </section>

      {/* Tabela de Desempenho por Turma */}
      <section className="data-section">
        <div className="data-section__header">
          <h3 className="data-section__title">Desempenho por Turma</h3>
          <button className="button button--outline">Exportar Relatório</button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Turma / Classe</th>
                <th>Professor Regente</th>
                <th>Qtd. Alunos</th>
                <th>Média (0-20)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {turmasData.map((item) => (
                <tr key={item.id}>
                  <td className="font-medium">{item.nome}</td>
                  <td>{item.regente}</td>
                  <td>{item.alunos}</td>
                  <td className="font-bold">{item.media}</td>
                  <td>
                    <span
                      className={`status-badge status-badge--${item.status}`}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL DE CADASTRO PEDAGÓGICO */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <header className="modal-card__header">
              <div>
                <h2 className="modal-card__title">
                  Cadastrar Membro Pedagógico
                </h2>
                <p className="modal-card__subtitle">
                  Adicione professores, coordenadores ou diretores ao sistema.
                </p>
              </div>
              <button
                className="modal-card__close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </header>

            <form
              className="modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
              }}
            >
              <div className="modal-form__grid">
                <div className="form-group">
                  <label className="form-group__label">Nome Completo</label>
                  <input
                    type="text"
                    className="form-group__input"
                    placeholder="Ex: Dr. Antunes Gomes"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-group__label">
                    E-mail Profissional
                  </label>
                  <input
                    type="email"
                    className="form-group__input"
                    placeholder="nome@onschool.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-group__label">Cargo / Função</label>
                  <select className="form-group__input" required>
                    <option value="">Selecione um cargo</option>
                    <option value="professor">Professor Regente</option>
                    <option value="coordenador">Coordenador Pedagógico</option>
                    <option value="diretor">Diretor Adjunto</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-group__label">Telefone</label>
                  <input
                    type="tel"
                    className="form-group__input"
                    placeholder="+244 9xx xxx xxx"
                  />
                </div>

                <div className="form-group form-group--full-width">
                  <label className="form-group__label">
                    Especialidade / Área de Formação
                  </label>
                  <input
                    type="text"
                    className="form-group__input"
                    placeholder="Ex: Engenharia Informática, Letras, Matemática"
                  />
                </div>
              </div>

              <footer className="modal-form__actions">
                <button
                  type="button"
                  className="button button--outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="button button--primary">
                  Salvar Cadastro
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
