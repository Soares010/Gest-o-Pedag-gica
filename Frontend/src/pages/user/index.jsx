import React from "react";
import "../../assets/styles/AddUser.css";

export const AddUser = () => {
  return (
    <div className="content-wrapper">
      {/* PAINEL DA ESQUERDA (FOTO) */}
      <aside className="form-card side-panel">
        <div className="card-title">Novo usuário</div>
        <div className="card-body">
          <div className="photo-upload">
            <div className="avatar-placeholder">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mario"
                alt="User"
              />
            </div>
            <span style={{ fontSize: "10px", color: "#94a3b8" }}>
              Apenas .jpg .png .jpeg
            </span>
          </div>
          <div className="input-field" style={{ marginTop: "25px" }}>
            <label>Regras de usuário *</label>
            <select>
              <option>-- Selecione --</option>
              <option>Administrador</option>
              <option>Secretário</option>
            </select>
          </div>
        </div>
      </aside>

      {/* PAINEL DA DIREITA (DADOS) */}
      <section className="form-card main-panel">
        <div className="card-title">Informações do usuário</div>
        <div className="card-body">
          <div className="input-grid-2">
            <div className="input-field">
              <label>Primeiro nome *</label>
              <input type="text" placeholder="Mário" />
            </div>
            <div className="input-field">
              <label>Último nome *</label>
              <input type="text" placeholder="Neto" />
            </div>
            <div className="input-field">
              <label>Nome do pai *</label>
              <input type="text" />
            </div>
            <div className="input-field">
              <label>Nome da mãe *</label>
              <input type="text" />
            </div>
          </div>

          <div
            className="input-grid-3"
            style={{
              marginTop: "15px",
              paddingTop: "15px",
              borderTop: "1px dashed #f1f5f9",
            }}
          >
            <div className="input-field">
              <label>País *</label>
              <select>
                <option>Angola</option>
              </select>
            </div>
            <div className="input-field">
              <label>Província *</label>
              <select>
                <option>Luanda</option>
              </select>
            </div>
            <div className="input-field">
              <label>Município *</label>
              <select>
                <option>Belas</option>
              </select>
            </div>
          </div>

          <div className="input-grid-3" style={{ marginTop: "15px" }}>
            <div className="input-field">
              <label>Telefone</label>
              <input type="text" placeholder="+244" />
            </div>
            <div className="input-field">
              <label>Telefone Alt.</label>
              <input type="text" />
            </div>
            <div className="input-field">
              <label>Email</label>
              <input type="email" />
            </div>
          </div>

		{/* <div className="input-field mt-20">
			<label>Endereço</label>
			<textarea rows="3" placeholder="Rua, Casa nº..."></textarea>
		</div> */}
        </div>
      </section>
    </div>
  );
};
