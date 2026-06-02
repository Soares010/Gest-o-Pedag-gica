import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Wallet,
  ChevronDown,
} from "lucide-react";
import "../assets/styles/Sidebar.css";

export const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    infoGerais: false,
    usuarios: true,
    financas: false,
  });

  const toggleMenu = (menuName) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-box">Q</div>
        <span>ON-SCHOOL</span>
      </div>

      <nav className="sidebar-nav">
        <small className="nav-section-title">HOME</small>
        <div className="nav-link active">
          <span className="nav-link-text">
            <LayoutDashboard size={18} /> Dashboard
          </span>
        </div>

        <small className="nav-section-title">PRE-INSERÇÃO DE DADOS</small>

        {/* Grupo: Informações Gerais */}
        <div className={`nav-group ${openMenus.infoGerais ? "open" : ""}`}>
          <div className="nav-link" onClick={() => toggleMenu("infoGerais")}>
            <span className="nav-link-text">
              <Users size={18} /> Informações Gerais
            </span>
            <ChevronDown size={14} className="chevron-icon" />
          </div>
          {/* Wrapper da animação */}
          <div className="sub-menu-wrapper">
            <div className="sub-menu">
              <div className="sub-link">Dados Pedagógicos</div>
              <div className="sub-link">Dados Financeiros</div>
            </div>
          </div>
        </div>

        {/* Grupo: Usuários */}
        <div className={`nav-group ${openMenus.usuarios ? "open" : ""}`}>
          <div className="nav-link" onClick={() => toggleMenu("usuarios")}>
            <span className="nav-link-text">
              <UserPlus size={18} /> Usuários
            </span>
            <ChevronDown size={14} className="chevron-icon" />
          </div>
          {/* Wrapper da animação */}
          <div className="sub-menu-wrapper">
            <div className="sub-menu">
              <div className="sub-link active">Adicionar Usuários</div>
              <div className="sub-link">Listar Usuários</div>
            </div>
          </div>
        </div>

        <small className="nav-section-title">FINANÇAS</small>

        {/* Grupo: Finanças */}
        <div className={`nav-group ${openMenus.financas ? "open" : ""}`}>
          <div className="nav-link" onClick={() => toggleMenu("financas")}>
            <span className="nav-link-text">
              <Wallet size={18} /> Área Financeira
            </span>
            <ChevronDown size={14} className="chevron-icon" />
          </div>
          {/* Wrapper da animação */}
          <div className="sub-menu-wrapper">
            <div className="sub-menu">
              <div className="sub-link">Pagamentos</div>
              <div className="sub-link">Relatório de Caixa</div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
