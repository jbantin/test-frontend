import { useContext } from "react";
import "./App.css";
import Input from "./components/Input";
import { LogContext } from "./components/LogContext";
import Login from "./components/Login";
import Signin from "./components/Signin";

function App() {
  const contextData = useContext(LogContext);

  return (
    <>
      {!contextData?.loggedIn ? (
        <div>{contextData?.signingIn ? <Signin /> : <Login />}</div>
      ) : (
        <></>
      )}
      <Input />
    </>
  );
}

export default App;
