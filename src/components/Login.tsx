import React, { useContext, useState } from "react";
import { LogContext } from "./LogContext";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const contextData = useContext(LogContext);
  console.log(contextData);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function sendLogin(): Promise<void> {
      try {
        const response = await fetch(
          "https://express-backend-delta.vercel.app/login",
          {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({
              email: emailValue,
              password: passwordValue,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: string = await response.text();
        contextData?.setLoggedIn(true);
      } catch (error) {
        console.error(error);
      }

      return;
    }
    sendLogin();
  };

  return (
    <div>
      {/* <div className="absolute w-48 bg-black left-1/3 top-[10%] h-48 rounded-full"></div>
      <div className="absolute w-48 bg-black right-1/3 top-[30%] h-48 rounded-full"></div> */}
      <div className="z-20 rounded-xl w-[500px] absolute translate-x-[-50%] translate-y-[20%]  left-1/2  mt-2 text-xl font-semibold p-12 bg-[rgba(255,255,255,0.13)] backdrop-blur ">
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <h3 className="ml-auto mr-auto text-4xl text-white">Login</h3>
          <label className="mt-8 text-white" htmlFor="email">
            Email
          </label>
          <input
            className="border-solid border w-full p-2 rounded-md outline-none"
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
            className="border-solid border w-full p-2 rounded-md outline-none"
          />
          <button
            className="  p-5 mt-8 bg-black text-white rounded-lg hover:bg-slate-300 hover:text-black"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
