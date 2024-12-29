import React, { useContext, useState } from "react";
import { LogContext } from "./LogContext";
import { MyDataObjectType } from "./LogContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log(backendUrl);
const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const contextData = useContext(LogContext);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function sendLogin(): Promise<void> {
      try {
        const response = await fetch(`${backendUrl}/login`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        });
        if (!response.ok) {
          throw new Error(`${await response.text()}`);
        }
        const data: {
          token: string;
          name: string;
          data: Array<MyDataObjectType>;
        } = await response.json();
        contextData?.setLoggedIn(true);
        contextData?.setUserChatData(data.data);
        contextData?.setAuthToken(data.token);
        contextData?.setUserName(data.name);
        console.log(data.data[0].a);
      } catch (error) {
        setErrorMsg(String(error));
      }

      return;
    }
    sendLogin();
  };

  return (
    <div>
      {/* <div className="absolute w-48 bg-black left-1/3 top-[10%] h-48 rounded-full"></div>
      <div className="absolute w-48 bg-black right-1/3 top-[30%] h-48 rounded-full"></div> */}
      <div className="z-20 w-full h-full absolute  mt-2 text-xl font-semibold p-12 bg-[rgba(255,255,255,0.13)] ] shadow-2xl backdrop-blur">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-3 w-[520px] m-auto mt-16 backdrop-blur rounded-lg border-[rgba(255,255,255,0.1)] border-2 shadow-2xl p-16"
        >
          <h3 className="ml-auto mr-auto text-4xl text-white">Login</h3>
          <label className="mt-8 text-white" htmlFor="email">
            Email
          </label>
          <input
            className="border-solid border w-full p-2 rounded-md outline-none bg-white"
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="email"
            id="email"
          />
          <label className="mt-8 text-white" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            placeholder="password"
            id="password"
            className="border-solid border w-full p-2 rounded-md outline-none bg-white"
          />
          <button
            className="  p-5 mt-8 bg-black text-white rounded-lg hover:bg-slate-300 hover:text-black"
            type="submit"
          >
            Log in
          </button>
          <p className="text-xs text-red-500">{errorMsg}</p>
          <button
            onClick={() => contextData?.setSigningIn(true)}
            className="block w-28 rounded-lg text-white hover:text-black hover:bg-xclr4 mr-0 ml-auto"
          >
            ...or signIn.
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
