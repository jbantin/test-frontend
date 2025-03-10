import React, { useContext, useState } from "react";
import { LogContext } from "./LogContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Signin = () => {
  const contextData = useContext(LogContext);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [isFetching, setIsfetching] = useState(false);
  const [verify, setVerify] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submitPinHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const verifyPin = async () => {
      try {
        let response = await fetch(`${backendUrl}/email_verification/verify`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            email: contextData?.userEmail,
            otp: pinValue,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${await response.text()}`);
        }
        //login new user
        response = await fetch(`${backendUrl}/login`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            email: contextData?.userEmail,
            password: passwordValue,
          }),
        });
        if (!response.ok) {
          throw new Error(`${await response.text()}`);
        }
        const data: { token: string; name: string } = await response.json();
        contextData?.setLoggedIn(true);
        contextData?.setAuthToken(data.token);
        contextData?.setUserName(data.name);
      } catch (error) {
        setErrorMsg(String(error));
        console.error(error);
      }
    };
    verifyPin();
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setIsfetching(true);
    e.preventDefault();
    const submitNewUser = async () => {
      if (contextData) {
        contextData.userName = nameValue;
        contextData.userEmail = emailValue;
      }

      try {
        const response = await fetch(`${backendUrl}/sign_up`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            name: nameValue,
            email: emailValue,
            password: passwordValue,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${await response.text()}`);
          return;
        }
        // const data: { name: string } = await response.json();
        setIsfetching(false);
        setVerify(true);
      } catch (error) {
        setErrorMsg(String(error));
        setIsfetching(false);
      }
    };

    submitNewUser();
  };
  return (
    <div>
      <div className="z-20 w-full h-full text-sm md:text-lg absolute  mt-2 text-xl font-semibold p-12 backdrop-blur">
        {verify ? (
          <form
            onSubmit={submitPinHandler}
            className="flex flex-col gap-3 w-[99%] md:w-[520px] m-auto mt-16 backdrop-blur rounded-lg border-xclr3 border-2 shadow-2xl p-16"
          >
            <h1 className="text-white">please check your email inbox and</h1>
            <div>
              <label className="inline-block text-white" htmlFor="pin">
                Enter code:{" "}
              </label>
              <input
                className="text-white bg-black m-2 p-1 rounded-md w-24 tracking-[0.6rem] items-center inline-block"
                type="text"
                name="pin"
                id="pin"
                value={pinValue}
                onChange={(e) => {
                  if (e.target.value.length <= 4) setPinValue(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 mt-8 bg-white text-black rounded-lg hover:bg-black hover:text-white"
            >
              submit
            </button>
            <p className="text-xs text-red-500">{errorMsg}</p>
          </form>
        ) : (
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-3 w-[520px] m-auto mt-16 backdrop-blur rounded-lg border-xclr3 border-2 shadow-2xl p-16"
          >
            <h3 className="ml-auto mr-auto text-4xl text-white">SignIn</h3>
            <label className="mt-8 text-white" htmlFor="name">
              Name
            </label>
            <input
              className="border-solid border w-full p-2 rounded-md outline-none text-white bg-black"
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              placeholder="name"
              id="name"
            />
            <label className=" text-white" htmlFor="email">
              Email
            </label>
            <input
              className="border-solid border w-full p-2 rounded-md outline-none text-white bg-black"
              type="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="email"
              id="email"
            />
            <label className=" text-white" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="password"
              id="password"
              className="border-solid border w-full p-2 rounded-md outline-none text-white bg-black"
            />
            <label className="text-white" htmlFor="password2">
              repeat password
            </label>
            <input
              type="password"
              value={password2Value}
              onChange={(e) => setPassword2Value(e.target.value)}
              placeholder="password"
              id="password2"
              className="border-solid border w-full p-2 rounded-md outline-none text-white bg-black"
            />
            {password2Value === passwordValue ? (
              <></>
            ) : (
              <p className="text-xs text-red-500">password doesn't fit</p>
            )}
            {isFetching ? (
              <button className="p-5 mt-8 bg-black text-white rounded-lg hover:bg-slate-300 hover:text-black">
                ...
              </button>
            ) : (
              <button
                className="p-5 mt-8 bg-black text-white rounded-lg hover:bg-slate-300 hover:text-black"
                type="submit"
              >
                Sign in
              </button>
            )}
            <p className="text-xs text-red-500">{errorMsg}</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signin;
