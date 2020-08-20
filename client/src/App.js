import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {Navbar} from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import 'materialize-css';
import {useGameStatus} from './hooks/useGameStatus';

const App = () => {
  const {token, login, logout, userId, userName} = useAuth();
  const [score, rows, level, maxScore] = useGameStatus(); 
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return(
    <AuthContext.Provider value={{
      token, userId, score, rows, level, maxScore, userName, login, logout,  isAuthenticated
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
