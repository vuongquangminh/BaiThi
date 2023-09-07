import { createContext, useState } from "react";
import { message } from "antd";
export const context = createContext();

const ContextProvider = ({ children }) => {
  //State
  const [authentication, setAuthentication] = useState(false);
  const [open, setOpen] = useState(false);
  const [reloadUser, setReloadUser] = useState(1);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [total, setTotal] = useState(364);
  const [key, setKey] = useState("");

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
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: success,
        duration: 1,
      });
    }, 2000);
  };

  const error = (error) => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  const nam = [
    { nam: "2023" },
    { nam: "2022" },
    { nam: "2021" },
    { nam: "2020" },
    { nam: "2019" },
    { nam: "2018" },
    { nam: "2017" },
    { nam: "2016" },
    { nam: "2015" },
    { nam: "2014" },
    { nam: "2013" },
    { nam: "2012" },
    { nam: "2011" },
    { nam: "2010" },
    { nam: "2009" },
    { nam: "2008" },
    { nam: "2007" },
    { nam: "2006" },
    { nam: "2005" },
    { nam: "2004" },
    { nam: "2003" },
    { nam: "2002" },
    { nam: "2001" },
    { nam: "2000" },
    { nam: "1999" },
    { nam: "1998" },
    { nam: "1997" },
  ];
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
    key,
    setKey,
    nam
  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ContextProvider;
