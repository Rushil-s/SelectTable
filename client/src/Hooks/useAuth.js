import React, { useContext } from 'react';

const AuthContext = React.createContext('');

const Provider = AuthContext.Provider;
function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, Provider };
