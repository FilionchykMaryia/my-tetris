import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { DetailPage } from './pages/DetailPage';
import { GamePage } from './pages/GamePage';
import { AuthPage } from './pages/AuthPage';

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/game" exact>
                    <GamePage />
                </Route>

                <Route path="/detail/:id">
                    <DetailPage />
                </Route> 

                <Redirect to="/game"/>
            </Switch>
        )
    };

    return (
        <Switch>
            <Route path="/auth" exact>
                <AuthPage />
            </Route> 
            <Redirect to="/auth"/>   
        </Switch>
    )
}