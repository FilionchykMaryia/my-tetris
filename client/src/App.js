import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {Navbar} from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import 'materialize-css';

const App = () => {
  const { login, logout, token, userId, currScore, currLevel} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return(
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, currScore, currLevel
    }}>
      <Router>
      
        <div className="App">
        { isAuthenticated && <Navbar/> }
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
  
};

export default App;
