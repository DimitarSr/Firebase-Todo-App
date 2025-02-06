import { createContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { registerUser, loginUser, logoutUser } from '../services/auth.service';
import { getUserData } from '../services/database.service';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        setUser(currentUser);
        try {
          const data = await getUserData(currentUser.uid);
          setUserData(data || null);
        } catch (error) {
          console.error('Error loading user data:', error);
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, userData, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
