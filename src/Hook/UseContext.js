import { createContext, useState } from "react";
import {  message } from "antd";
export const context = createContext();

const ContextProvider = ({ children }) => {
  //State
  const [authentication, setAuthentication] = useState(false);
  const [open, setOpen] = useState(false);
  const [reloadUser, setReloadUser] = useState(1)
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  //hook
  const [messageApi, contextHolder] = message.useMessage();


  //function
  function GetTokenFromLocalStorage() {
    return localStorage.getItem("accessToken");
  }
  function SaveTokenToLocalStorage(title, token) {
    localStorage.setItem(title, token);
  }
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
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
    setReloadUser,
    passwordsMatch,
    setPasswordsMatch,

  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ContextProvider;
