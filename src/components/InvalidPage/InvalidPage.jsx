import { useNavigate } from "react-router-dom";
import "./InvalidPage.css";

const InvalidPage = () => {
  const navigate = useNavigate();

  return (
    <div className="invalid-page">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>

      <button onClick={() => navigate("/")} className="go-back">
        🔙 Go Back
      </button>
    </div>
  );
};

export default InvalidPage;
