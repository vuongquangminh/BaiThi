import { createContext, useState } from "react";
import {  message } from "antd";
export const context = createContext();

const ContextProvider = ({ children }) => {
  //State
  const [authentication, setAuthentication] = useState(false);
  const [open, setOpen] = useState(false);
  const [reloadUser, setReloadUser] = useState(1)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [total, setTotal] = useState(364)
  const [key, setKey] = useState('')


  //hook
  const [messageApi, contextHolder] = message.useMessage();


  //function
  function GetTokenFromLocalStorage(key) {
    return localStorage.getItem(key);
  }
  function SaveTokenToLocalStorage(title, token) {
    localStorage.setItem(title, token);
  }
  const success = (success) => {
    messageApi.open({
      type: 'success',
      content: success,
    });
  };

  const error = (error) => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };
  //Value
  const value = {
    authentication,
    setAuthentication,
    GetTokenFromLocalStorage,
    SaveTokenToLocalStorage,
    error,
    success,
    warning,
    contextHolder,
    setOpen,
    reloadUser,
    setReloadUser,
    passwordsMatch,
    setPasswordsMatch,
    total,
    setTotal,
    key, setKey

  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ContextProvider;
