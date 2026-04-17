import API from "../services/API.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageKind, setMessageKind] = useState("error");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      const response = await API.post("/", formData);
      setMessageKind("success");
      setMessage(response?.data?.message || "Login realizado com sucesso");

      const token = response?.data?.token;
      if (token) localStorage.setItem("auth:token", token);

      navigate("/");
    } catch (error) {
      setMessageKind("error");
      setMessage(error.response?.data?.message || "Erro ao fazer login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <header className="auth-header">
            <h1 className="auth-title">Entrar</h1>
            <p className="auth-subtitle">
              Acesse com seu usuário e senha para continuar.
            </p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-username">
                Usuário
              </label>
              <input
                id="login-username"
                className="auth-input"
                type="text"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Seu nome de usuário"
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">
                Senha
              </label>
              <div className="auth-input-wrap">
                <input
                  id="login-password"
                  className="auth-input auth-input--with-toggle"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff size={20} aria-hidden />
                  ) : (
                    <Eye size={20} aria-hidden />
                  )}
                </button>
              </div>
            </div>

            {message ? (
              <p
                className={`auth-message ${
                  messageKind === "success"
                    ? "auth-message--success"
                    : "auth-message--error"
                }`}
                role="alert"
              >
                {message}
              </p>
            ) : null}

            <button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Entrando…" : "Entrar"}
            </button>
          </form>

          <footer className="auth-footer">
            Não tem conta? <Link to="/register">Criar conta</Link>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Login;
