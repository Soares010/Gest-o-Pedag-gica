import React, { useReducer, useState } from "react";
import "../../assets/styles/AddUser.css";
import { Sidebar } from "../../components/Sidebar";

function registerReducer(state, action) {
  switch (action.type) {
    case "REGISTER_START":
      return { ...state, loading: true, error: null, success: false };

    case "REGISTER_STUDENT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        userData: action.payload,
      };

    case "REGISTER_TEACHER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        userData: action.payload,
      };

    case "REGISTER_ADMIN_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        userData: action.payload,
      };

    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const AddUser = () => {
  const [state, dispatch] = useReducer(registerReducer, {});
  const [userRole, setUserRole] = useState("aluno");
  const [user, setUser] = useState({});
  const { studentAdd } = useUser();

  const getRoleLabel = () => {
    switch (userRole) {
      case "aluno":
        return "Estudante";
      case "professor":
        return "Docente";
      case "admin":
        return "Administrativo (Secretaria/Direção)";
      // case "outro":
      //   return "Outros Serviços";
      default:
        return "Usuário";
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // 1. Sinaliza que o registo começou (pode usar para mostrar um spinner no botão)
    dispatch({ type: "REGISTER_START" });

    try {
      // 2. O switch decide qual lógica/API chamar com base no cargo atual
      switch (userRole) {
        case "aluno":
          console.log("Enviando dados para a API de Alunos:", user);
          // Exemplo de integração:
          // const resAluno = await api.post("/alunos", user);

          // Se correu bem, envia o sucesso para o reducer
          dispatch({ type: "REGISTER_STUDENT_SUCCESS", payload: user });
          //     alert("Estudante registado com sucesso!");
          break;

        case "professor":
          console.log("Enviando dados para a API de Professores:", user);
          // const resProf = await api.post("/professores", user);

          dispatch({ type: "REGISTER_TEACHER_SUCCESS", payload: user });
          //     alert("Docente registado com sucesso!");
          break;

        case "admin":
          console.log("Enviando dados para a API de Administrativos:", user);
          // const resAdmin = await api.post("/admins", user);

          dispatch({ type: "REGISTER_ADMIN_SUCCESS", payload: user });
          //     alert("Administrativo registado com sucesso!");
          break;

        default:
          throw new Error("Cargo de utilizador inválido.");
      }
    } catch (error) {
      // Se houver algum erro na requisição, avisa o reducer
      dispatch({ type: "REGISTER_FAILURE", payload: error.message });
      alert("Erro ao salvar o registo: " + error.message);
    }
  }

  function handleChange(e) {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  console.log(user);

  return (
    <div className="layout-container">
      <Sidebar />

      <main className="main-content">
        <form onSubmit={handleSubmit}>
          <div className="content-wrapper">
            <header className="page-header">
              <h1 className="page-title">Registo de Utentes</h1>

              {/* Sistema de Tabs Expandido */}
              <div className="tabs-container">
                <button
                  className={`tab-button ${userRole === "aluno" ? "active" : ""}`}
                  onClick={() => setUserRole("aluno")}
                >
                  Aluno
                </button>
                <button
                  className={`tab-button ${userRole === "professor" ? "active" : ""}`}
                  onClick={() => setUserRole("professor")}
                >
                  Professor
                </button>
                <button
                  className={`tab-button ${userRole === "admin" ? "active" : ""}`}
                  onClick={() => setUserRole("admin")}
                >
                  Administrativo
                </button>
                {/* <button
                  className={`tab-button ${userRole === "outro" ? "active" : ""}`}
                  onClick={() => setUserRole("outro")}
                >
                  Outros
                </button> */}
              </div>
            </header>

            <div className="form-layout">
              {/* PAINEL DA ESQUERDA (FOTO E PERFIL) */}
              <aside className="form-card side-panel">
                <div className="card-header">
                  <h2 className="card-title">Perfil</h2>
                </div>
                <div className="card-body">
                  <div className="photo-upload">
                    {/* <div className="avatar-placeholder">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userRole}`}
                      alt="User Avatar"
                    />
                  </div> */}
                    {/* <span className="upload-hint">Apenas .jpg, .png</span> */}
                    {/* <button className="btn-upload">Carregar Foto</button> */}
                  </div>

                  <div className="input-field mt-20">
                    <label>Nível de Acesso no Sistema *</label>
                    <select disabled value={userRole}>
                      <option value="Student">Acesso de Estudante</option>
                      <option value="Teacher">Acesso de Docente</option>
                      <option value="Administrator">
                        Acesso Administrativo
                      </option>
                      {/* <option value="outro">Acesso Restrito</option> */}
                    </select>
                  </div>

                  <div className="role-badge mt-15">
                    <span>Cargo:</span> {getRoleLabel()}
                  </div>
                </div>
              </aside>

              {/* PAINEL DA DIREITA (DADOS) */}
              <section className="form-card main-panel">
                <div className="card-header">
                  <h2 className="card-title">Informações Pessoais</h2>
                </div>
                <div className="card-body">
                  {/* DADOS COMUNS A TODOS */}
                  <div className="input-grid-2">
                    <div className="input-field">
                      <label>Primeiro nome *</label>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Ex: Mário"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="input-field">
                      <label>Último nome *</label>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Ex: Neto"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="input-field">
                      <label>Data de Nascimento *</label>
                      <input
                        type="date"
                        name="borndate"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="input-field">
                      <label>Gênero *</label>
                      <select name="gender" onChange={(e) => handleChange(e)}>
                        <option value="">-- Selecione --</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                      </select>
                    </div>
                  </div>

                  <div className="divider"></div>

                  {/* DADOS ESPECÍFICOS POR PERFIL */}
                  <div
                    className="dynamic-section animate-fade-in"
                    key={userRole}
                  >
                    <h3 className="section-subtitle">
                      {userRole === "aluno" && "Filiação e Dados Académicos"}
                      {userRole === "professor" && "Dados Profissionais"}
                      {userRole === "admin" && "Dados do Cargo Administrativo"}
                      {userRole === "outro" && "Detalhes da Função"}
                    </h3>

                    {/* FORMULÁRIO DO ALUNO */}
                    {userRole === "aluno" && (
                      <>
                        <div className="input-grid-2 mt-15">
                          <div className="input-field">
                            <label>Nome do pai *</label>
                            <input
                              type="text"
                              name="fathername"
                              placeholder="Nome completo do pai"
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                          <div className="input-field">
                            <label>Nome da mãe *</label>
                            <input
                              type="text"
                              name="mothername"
                              placeholder="Nome completo da mãe"
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                        </div>

                        <div className="input-grid-4 mt-15">
                          <div className="input-field">
                            <label>Classe *</label>
                            <select
                              name="grade"
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="">--Selecione a Classe--</option>
                              <option value="10">10ª Classe</option>
                              <option value="11">11ª Classe</option>
                              <option value="12">12ª Classe</option>
                              <option value="13">13ª Classe</option>
                            </select>
                          </div>
                          {/* <div className="input-field">
                            <label>Turma *</label>
                            <input type="text" placeholder="Ex: A" />
                          </div> */}
                          <div className="input-field">
                            <label>Sala *</label>
                            <input
                              type="text"
                              name="classroom"
                              placeholder="Ex: 14"
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                          <div className="input-field">
                            {/* <label>Turno *</label> */}
                            {/* <select>
                              <option>Manhã</option>
                              <option>Tarde</option>
                              <option>Noite</option>
                            </select> */}
                          </div>
                        </div>
                      </>
                    )}

                    {/* FORMULÁRIO DO PROFESSOR */}
                    {userRole === "professor" && (
                      <div className="input-grid-2 mt-15">
                        <div className="input-field">
                          <label>Grau Académico *</label>
                          <select
                            name="academiclevel"
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">
                              --Selecione o Nível Acadêmico--
                            </option>
                            <option value="Bacharelato">Bacharelato</option>
                            <option value="Licenciatura">Licenciatura</option>
                            <option value="Mestrado">Mestrado</option>
                            <option value="Doutoramento">Doutoramento</option>
                          </select>
                        </div>
                        <div className="input-field">
                          {/* <label>Especialidade / Disciplina principal *</label>
                          <input
                            type="text"
                            placeholder="Ex: Matemática, Física"
                          /> */}
                        </div>
                      </div>
                    )}

                    {/* FORMULÁRIO ADMINISTRATIVO */}
                    {userRole === "admin" && (
                      <div className="input-grid-2 mt-15">
                        <div className="input-field">
                          <label>Cargo Funcional *</label>
                          <select
                            name="office"
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="">--Selecione o Cargo--</option>
                            <option value="Secretary">Secretário(a)</option>
                            <option value="Coordinator">Coordenador(a)</option>
                          </select>
                        </div>
                        {/* <div className="input-field">
                          <label>Departamento *</label>
                          <input
                            type="text"
                            placeholder="Ex: Secretaria Geral, Pedagogia"
                          />
                        </div> */}
                      </div>
                    )}

                    {/* FORMULÁRIO OUTROS */}
                    {/* {userRole === "outro" && (
                      <div className="input-grid-2 mt-15">
                        <div className="input-field">
                          <label>Função / Ocupação *</label>
                          <input
                            type="text"
                            placeholder="Ex: Segurança, Motorista, Limpeza"
                          />
                        </div>
                        <div className="input-field">
                          <label>Empresa Terceirizada (Opcional)</label>
                          <input
                            type="text"
                            placeholder="Nome da empresa, se aplicável"
                          />
                        </div>
                      </div>
                    )} */}
                  </div>

                  <div className="divider"></div>

                  {/* LOCALIZAÇÃO E CONTACTOS (COMUNS A TODOS) */}
                  <h3 className="section-subtitle">Localização e Contactos</h3>
                  <div className="input-grid-3 mt-15">
                    <div className="input-field">
                      <label>País *</label>
                      <select
                        // defaultValue="Angola"
                        name="country"
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="">--Selecione o País--</option>
                        <option value="Angola">Angola</option>
                      </select>
                    </div>
                    <div className="input-field">
                      <label>Província *</label>
                      <select
                        // defaultValue="Luanda"
                        name="province"
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="">--Selecione a Província--</option>
                        <option value="Luanda">Luanda</option>
                      </select>
                    </div>
                    <div className="input-field">
                      <label>Município *</label>
                      <select
                        // defaultValue="Belas"
                        name="municipality"
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="">--Selecione Município--</option>
                        <option value="Belas">Belas</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-grid-3 mt-15">
                    <div className="input-field">
                      <label>Telefone</label>
                      <input
                        type="text"
                        placeholder="+244"
                        name="phone"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    {/* <div className="input-field">
                      <label>Telefone Alternativo</label>
                      <input type="text" placeholder="+244" />
                    </div> */}
                    <div className="input-field">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="usuario@email.com"
                        name="email"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn-cancel">Cancelar</button>
                    <button className="btn-save" type="submit">
                      Salvar Registo
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
