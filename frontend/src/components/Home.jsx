import { Link, Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth:token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("auth:token");
    navigate("/login", { replace: true });
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <header className="auth-header">
            <h1 className="auth-title">Bem-vindo</h1>
            <p className="auth-subtitle">Sessão iniciada com sucesso.</p>
          </header>
          <footer className="auth-footer">
            <button
              type="button"
              className="auth-submit"
              onClick={handleLogout}
              style={{ width: "100%" }}
            >
              Sair
            </button>
            <p style={{ marginTop: "1rem", marginBottom: 0 }}>
              <Link to="/register">Ir para cadastro</Link>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Home;
