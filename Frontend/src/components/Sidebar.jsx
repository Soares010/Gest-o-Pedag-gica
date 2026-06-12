import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Wallet,
  ChevronDown,
} from "lucide-react";
import "../assets/styles/Sidebar.css";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  // Remove a barra inicial para validação de rota ativa
  const checkLocals = location.pathname.replace(/^\//, "");
  //   console.log("Rota atual ativa:", checkLocals);

  // Estado para controlar os menus abertos (adiciona a classe "open")
  const [openMenus, setOpenMenus] = useState({
    infoGerais: false,
    usuarios: false,
    financas: false,
  });

  // Efeito para abrir automaticamente o dropdown da rota que estiver ativa no momento
  useEffect(() => {
    if (checkLocals === "manager") {
      setOpenMenus((prev) => ({ ...prev, infoGerais: true }));
    } else if (checkLocals === "adduser") {
      setOpenMenus((prev) => ({ ...prev, usuarios: true }));
    } else if (checkLocals === "finances") {
      setOpenMenus((prev) => ({ ...prev, financas: true }));
    }
  }, [checkLocals]);

  // Alterna o estado do menu ao clicar
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

        {/* Link Dashboard */}
        <div
          className={`nav-link ${checkLocals === "dashboard" ? "active" : ""}`}
        >
          <Link to="/dashboard">
            <span className="nav-link-text">
              <LayoutDashboard size={18} /> Dashboard
            </span>
          </Link>
        </div>

        <small className="nav-section-title">PRE-INSERÇÃO DE DADOS</small>

        {/* Grupo: Informações Gerais */}
        <div className={`nav-group ${openMenus.infoGerais ? "open" : ""}`}>
          <div
            className={`nav-link ${checkLocals === "manager" ? "active" : ""}`}
            onClick={() => toggleMenu("infoGerais")}
          >
            <span className="nav-link-text">
              <Users size={18} /> Informações Gerais
            </span>
            <ChevronDown size={14} className="chevron-icon" />
          </div>
          {/* Wrapper da animação */}
          <div className="sub-menu-wrapper">
            <div className="sub-menu">
              <div
                className={`sub-link ${checkLocals === "manager" ? "active" : ""}`}
              >
                <Link to="/manager">Dados Pedagógicos</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Grupo: Usuários */}
        <div className={`nav-group ${openMenus.usuarios ? "open" : ""}`}>
          <div
            className={`nav-link ${checkLocals === "adduser" ? "active" : ""}`}
            onClick={() => toggleMenu("usuarios")}
          >
            <span className="nav-link-text">
              <UserPlus size={18} /> Usuários
            </span>
            <ChevronDown size={14} className="chevron-icon" />
          </div>
          {/* Wrapper da animação */}
          <div className="sub-menu-wrapper">
            <div className="sub-menu">
              <div
                className={`sub-link ${checkLocals === "adduser" ? "active" : ""}`}
              >
                <Link to="/adduser">Adicionar Usuários</Link>
              </div>
            </div>
          </div>
        </div>

        <small className="nav-section-title">FINANÇAS</small>

        {/* Grupo: Finanças */}
        <div className={`nav-group ${openMenus.financas ? "open" : ""}`}>
          <div
            className={`nav-link ${checkLocals === "finances" ? "active" : ""}`}
            onClick={() => toggleMenu("financas")}
          >
            <span className="nav-link-text">
              <Wallet size={18} /> Área Financeira
            </span>
            <ChevronDown size={14} className="chevron-icon" />
          </div>
          {/* Wrapper da animação */}
          <div className="sub-menu-wrapper">
            <div className="sub-menu">
              <div
                className={`sub-link ${checkLocals === "finances" ? "active" : ""}`}
              >
                <Link to="/finances">Pagamentos</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
