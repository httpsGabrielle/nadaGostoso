import { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import { login, signupApi } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const signin = async (userData) => {
    try {
      const user = await login(userData)
      
      if (user.token) {
        await SecureStore.setItemAsync('nada_gostoso_token', JSON.stringify(user));
        setAuthenticated(true);
        setUser(user);
        return user
      }
    } catch (err) {
      console.log(err)
      return null
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('nada_gostoso_token')
      setAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.log(err)
    }
  };

  const signup = async (userData) => {
    try {
      await signupApi(userData)
      const token = await login({ username: userData.username, password: userData.password })

      if (token) {
        setAuthenticated(true)
        setUser(token)
        return token
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const authContextValue = {
    authenticated,
    user,
    signin,
    signup,
    logout,
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await SecureStore.getItemAsync('nada_gostoso_token')

      if (token) {
        setAuthenticated(true);
        setUser(token)
      }
    };

    checkAuthentication();
  }, [])

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider }