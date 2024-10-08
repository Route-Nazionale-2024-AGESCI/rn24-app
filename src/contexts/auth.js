import React, { useContext, useState, useEffect } from "react";
import { useNetworkState } from "@uidotdev/usehooks";

import axios from "../lib/api";
import { getUser } from "../lib/dataManager/user";

import * as authAPI from "../lib/api/auth";

const LOCAL_STORAGE_TOKEN_KEY = "atoken";
const LOCAL_STORAGE_CSRF_TOKEN_KEY = "csrftoken";

export const AuthStatus = Object.freeze({
  LoggedIn: Symbol("logged_in"),
  LoggedOut: Symbol("logged_out"),
  Loading: Symbol("loading"),
});

const defaultState = {
  status: AuthStatus.LoggedOut,
  token: null,
  csrftoken: null,
  loginAction: async ({ username, password }) => {},
  logOut: () => {},
  user: null,
  isLoaded: false,
};

export const AuthContext = React.createContext(defaultState);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthIsLoggedIn = ({ children }) => {
  const { isLoaded, status } = useContext(AuthContext);
  return <>{isLoaded && status === AuthStatus.LoggedIn ? children : null}</>;
};

export const AuthIsNotLoggedIn = ({ children }) => {
  const { status, isLoaded } = useContext(AuthContext);
  return <>{isLoaded && status === AuthStatus.LoggedOut ? children : null}</>;
};

const getInitialTokens = () => {
  // TODO: transform this in a hook, syncing with query params
  const query = new URLSearchParams(window.location.search);

  const impersonateToken = query.get("at");
  const impersonateCsrfToken = query.get("ct");

  if (
    impersonateToken &&
    impersonateToken.match(/^[a-f0-9]{40}$/) &&
    impersonateCsrfToken
  ) {
    return [impersonateToken, impersonateCsrfToken];
  }

  // TODO: use a hook to sync with localStorage
  return [
    localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
    localStorage.getItem(LOCAL_STORAGE_CSRF_TOKEN_KEY),
  ];
};

const AuthProvider = ({ children }) => {
  const [localToken, localCsrfToken] = getInitialTokens();
  const networkState = useNetworkState();
  const [status, setStatus] = useState(
    localToken && localCsrfToken ? AuthStatus.Loading : AuthStatus.LoggedOut
  );
  const [token, setToken] = useState(localToken);
  const [csrfToken, setCsrfToken] = useState(localCsrfToken);
  const [user, setUser] = useState(null);

  const onLine = networkState.online;

  const logOut = () => {
    setToken(null);
    setCsrfToken(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CSRF_TOKEN_KEY);
    setStatus(AuthStatus.LoggedOut);
    setUser(null);
  };

  useEffect(() => {
    if (token && csrfToken) {
      const interceptor = axios.interceptors.request.use(
        (config) => {
          config.headers["Authorization"] = `Token ${token}`;
          config.headers["X-CSRFToken"] = `${csrfToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      const resInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          const status = error.response?.status;
          if (status === 401 || status === 403) {
            console.log(error);
            logOut();
            Promise.resolve();
            //localStorage.clear();
            // if (window.location.pathname === "/login") {
            //   return Promise.reject(error);
            // } else {
            //   window.location = "/login";
            //   return Promise.resolve(error);
            // }
          }
          return Promise.reject(error);
        }
      );

      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      localStorage.setItem(LOCAL_STORAGE_CSRF_TOKEN_KEY, csrfToken);
      setStatus(AuthStatus.LoggedIn);

      return () => {
        axios.interceptors.request.eject(interceptor);
        axios.interceptors.response.eject(resInterceptor);
        //console.log("Clearing whole local storage...");
        //localStorage.clear();
      };
    }
  }, [token, csrfToken]);

  useEffect(() => {
    if (token && csrfToken) {
      if (onLine) {
        getUser().then((res) => {
          setUser(res);
          localStorage.setItem("user", JSON.stringify(res));
        });
        // .catch(error => {
        //   console.log(error);
        //   window.localtion = "/login"
        // });
      } else {
        setUser(JSON.parse(localStorage.getItem("user")) ?? {});
      }
    } else {
      localStorage.removeItem("user");
    }
  }, [token, csrfToken, onLine]);

  const loginAction = async ({ username, password }) => {
    try {
      const res = await authAPI.login({ username, password });

      if (res) {
        setToken(res.token);
        setCsrfToken(res.csrftoken);
        return;
      }
    } catch (error) {
      throw error;
    }
  };

  const isLoaded = AuthStatus.Loading !== status;
  if (!isLoaded) return <h4>Loading...</h4>;

  return (
    <AuthContext.Provider
      value={{
        status,
        token,
        csrftoken: csrfToken,
        loginAction,
        logOut,
        user,
        isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
