// src/components/Layout.jsx
import { Sidebar } from "./Sidebar";
import "../assets/styles/global.css";

export const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "32px",
          marginLeft: "var(--sidebar-width)", // Garante que o conteúdo não fique por baixo da sidebar
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
};
