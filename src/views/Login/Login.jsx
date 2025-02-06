import { useState } from 'react';
import { loginUser } from '../../services/auth.service';
import { useNavigate, NavLink } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      navigate('/todos');
    } catch (error) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p className="redirect-text">
        Don&apos;t have an account?{' '}
        <NavLink to="/register" className="redirect-link">
          Register
        </NavLink>
      </p>
    </div>
  );
};

export default Login;
