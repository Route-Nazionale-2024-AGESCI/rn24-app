import React, { useContext, useState, useEffect } from "react";

import axios from "../lib/api";
import { getUser } from "../lib/dataManager/user";

import * as authAPI from "../lib/api/auth";

const LOCAL_STORAGE_TOKEN_KEY = 'atoken';

const AuthStatus = Object.freeze({
    LoggedIn:   Symbol("logged_in"),
    LoggedOut:  Symbol("logged_out"),
    Loading:  Symbol("loading"),
});

const defaultState = {
    status: AuthStatus.LoggedOut,
    token: null,
    loginAction: async ({username, password}) => {},
    logOut: () => {},
    user: null,
    isLoaded: false,
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsLoggedIn = ({ children }) => {
    const { isLoaded, status } = useContext(AuthContext);
    return <>{isLoaded && status === AuthStatus.LoggedIn ? children : null}</>;
};

export const AuthIsNotLoggedIn = ({ children }) => {
    const { status, isLoaded } = useContext(AuthContext);
    return <>{isLoaded && status === AuthStatus.LoggedOut ? children : null}</>;
};


const AuthProvider = ({ children }) => {
    const localToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const [status, setStatus] = useState(
        localToken
        ? AuthStatus.Loading
        : AuthStatus.LoggedOut
    );
    const [token, setToken] = useState(localToken);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(token) {
            const interceptor = axios.interceptors.request.use(
                config => {
                    config.headers['Authorization'] = `Token ${token}`;
                        return config;
                    },
                    error => {
                        return Promise.reject(error);
                    }
            );

            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

            getUser().then(res => {
                setUser(res);
                setStatus(AuthStatus.LoggedIn);
            });
            return () => {
                axios.interceptors.request.eject(interceptor);
            };
        }
        // removeAuthenticationHeader();
    }, [token]);
    
    
    const loginAction = async ({username, password}) => {
      try {
        const res = await authAPI.login({username, password});

        if (res) {
            setToken(res.token);
            window.location.href = "/";
            return;
        }
      } catch (error) {
        throw error;
      }
    };
  
    const logOut = () => {
      setToken(null);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      setStatus(AuthStatus.LoggedOut);
    //   removeAuthenticationHeader();
      window.location.href = "/login";
    };
    
    const isLoaded = AuthStatus.Loading !== status;
    
    if(!isLoaded)
        return 'Caricamento...';

    return (
      <AuthContext.Provider value={{ status, token, loginAction, logOut, user, isLoaded }}>
        {children}
      </AuthContext.Provider>
    );
  
};

export default AuthProvider;
