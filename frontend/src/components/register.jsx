import API from "../services/API.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await API.post("/register", formData);

      setMessage(response.data.message || "Cadastro realizado com sucesso.");
      setMessageType("success");

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setMessage(error.response?.data?.message || "Erro ao cadastrar usuário");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-card" aria-labelledby="register-title">
          <header className="auth-header">
            <h1 id="register-title" className="auth-title">
              Criar conta
            </h1>
            <p className="auth-subtitle">
              Preencha seus dados para se cadastrar na plataforma.
            </p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="username" className="auth-label">
                Nome de usuário
              </label>
              <div className="auth-input-wrap">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="auth-input"
                  placeholder="Digite seu nome de usuário"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="email" className="auth-label">
                E-mail
              </label>
              <div className="auth-input-wrap">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="auth-input"
                  placeholder="Digite seu e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">
                Senha
              </label>
              <div className="auth-input-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="auth-input auth-input--with-toggle"
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {message && (
              <p
                className={`auth-message ${
                  messageType === "success"
                    ? "auth-message--success"
                    : "auth-message--error"
                }`}
              >
                {message}
              </p>
            )}

            <button type="submit" className="auth-submit" disabled={isSubmitting}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <UserPlus size={18} />
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </span>
            </button>
          </form>

          <footer className="auth-footer">
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default Register;