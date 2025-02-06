import { useState } from 'react';
import { registerUser } from '../../services/auth.service';
import {
  createUserHandle,
  getUserByHandle,
} from '../../services/database.service';
import { useNavigate, NavLink } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const existingHandle = await getUserByHandle(handle);
      if (existingHandle) {
        setError('This username is already taken. Try another one.');
        return;
      }

      const userCredential = await registerUser(email, password);

      await createUserHandle(handle, userCredential.user.uid, email);

      navigate('/todos');
    } catch (error) {
      console.log('Registration Error:', error);

      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try logging in.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else {
        setError('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
      <p className="redirect-text">
        Already have an account?{' '}
        <NavLink to="/login" className="redirect-link">
          Login here
        </NavLink>
      </p>
    </div>
  );
};

export default Register;
