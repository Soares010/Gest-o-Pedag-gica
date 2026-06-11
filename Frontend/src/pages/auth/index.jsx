import { useState } from "react";
import "../../assets/styles/auth.css";
import { useAuth } from "../../hooks/useAuth";
import { Toaster } from "react-hot-toast";

export const Auth = () => {
  const { authenticateUser } = useAuth();
  const [user, setUer] = useState({});

  function handleChange(e) {
    setUer({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await authenticateUser(user);
  }

  return (
    <div className="login-layout">
      <Toaster />
      <div className="login-card">
        {/* Header com a Logo do ON-SCHOOL */}
        <div className="login-card__header">
          <div className="brand">
            <div className="brand__icon">Q</div>
            <span className="brand__name">ON-SCHOOL</span>
          </div>
          <h1 className="login-card__title">Bem-vindo de volta</h1>
          <p className="login-card__subtitle">
            Insira suas credenciais para acessar o painel administrativo.
          </p>
        </div>

        {/* Formulário */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-group__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="form-group__input"
              type="email"
              id="email"
              placeholder="admin@onschool.com"
              required
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="password">
              Palavra-passe
            </label>
            <input
              className="form-group__input"
              type="password"
              id="password"
              placeholder="••••••••"
              required
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="login-form__actions">
            {/* <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox-wrapper__input" />
              <span className="checkbox-wrapper__label">Lembrar-me</span>
            </label> */}
            <a href="/recuperar-senha" className="login-form__forgot-link">
              Esqueceu a senha?
            </a>
          </div>

          <button type="submit" className="button button--primary button--full">
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
};
