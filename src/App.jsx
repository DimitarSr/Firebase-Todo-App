import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DatabaseProvider } from './contexts/DatabaseContext';
import ProtectedRoute from './hoc/ProtectedRoute';
import Header from './components/Header/Header';
import './App.css';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Todos from './views/Todos/Todos';
import Home from './components/Home/Home';

function App() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </DatabaseProvider>
    </AuthProvider>
  );
}

const MainRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {!loading && user && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<p>InvalidPage</p>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate replace to={'/home'} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
