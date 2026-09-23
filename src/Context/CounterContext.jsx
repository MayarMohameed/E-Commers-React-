import { createContext, useEffect, useState } from "react";

export let CounterContext = createContext(null);

export function CounterContextProvider(props) {
  let [counter, setCounter] = useState(0);
  let [userName, setUserName] = useState("Guest");
  let [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserLogin(token);
      const savedUser = localStorage.getItem("userName");
      if (savedUser) setUserName(savedUser);
    }
  }, []);

  function demoLogin() {
    const demoToken = "demo_khamsat_user_token_2026";
    const demoName = "Demo Customer";
    localStorage.setItem("userToken", demoToken);
    localStorage.setItem("userName", demoName);
    setUserLogin(demoToken);
    setUserName(demoName);
    return true;
  }

  function logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    setUserLogin(null);
    setUserName("Guest");
  }

  return (
    <CounterContext.Provider
      value={{
        counter,
        setCounter,
        userName,
        setUserName,
        userLogin,
        setUserLogin,
        demoLogin,
        logout,
      }}
    >
      {props.children}
    </CounterContext.Provider>
  );
}