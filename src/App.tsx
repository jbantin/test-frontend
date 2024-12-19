import { useContext } from "react";
import "./App.css";
import Input from "./components/Input";
import { LogContext } from "./components/LogContext";
import Login from "./components/Login";
import Signin from "./components/Signin";

function App() {
  const contextData = useContext(LogContext);
  console.log(contextData?.loggedIn);
  return (
    <>
      {!contextData?.loggedIn ? (
        <div>
          <Login />
          {/* <Signin /> */}
        </div>
      ) : (
        <></>
      )}
      <Input />
    </>
  );
}

export default App;
