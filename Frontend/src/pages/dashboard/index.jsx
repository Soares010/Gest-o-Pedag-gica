import { ArrowUp, ArrowDown, Filter } from "lucide-react";
import { Sidebar } from "../../components/Sidebar";
// import "../assets/styles/index.css";

export const Dashboard = () => (
  <>
    {/* <div className="app-layout"> */}
    {/* </div> */}
    <div className="page-content main-container">
      <Sidebar />
      <header className="page-title">
        <h2>Estatística</h2>
      </header>

      <div className="card filter-bar">
        <div className="field">
          <label>Ano lectivo</label>
          <select>
            <option>2023/2024</option>
          </select>
        </div>
        <div className="field">
          <label>Tipo de estatística</label>
          <select>
            <option>Geral</option>
          </select>
        </div>
        <button className="btn-primary">
          <Filter size={18} /> Filtrar
        </button>
      </div>

      <div className="stats-grid">
        {[
          { label: "Devedores", val: "2.648", trend: "up" },
          { label: "Entradas do dia", val: "2.648", trend: "down" },
          { label: "Caixa Semanal", val: "2.648", trend: "up" },
          { label: "Total Mensal", val: "2.648", trend: "down" },
        ].map((s, i) => (
          <div key={i} className="card stat-card">
            <div className="stat-info">
              <p>{s.label}</p>
              <h3>{s.val}</h3>
            </div>
            <div className={`trend-icon ${s.trend}`}>
              {s.trend === "up" ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);
