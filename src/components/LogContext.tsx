import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

export const LogContext = createContext<
  | {
      loggedIn: boolean;
      setLoggedIn: Dispatch<SetStateAction<boolean>>;
      authToken: string;
      setAuthToken: Dispatch<SetStateAction<string>>;
      signingIn: boolean;
      setSigningIn: Dispatch<SetStateAction<boolean>>;
      userName: string;
      userEmail: string;
    }
  | undefined
>(undefined);

export function LogContextProvider({ children }: React.PropsWithChildren<{}>) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const userName = "otto";
  const userEmail = "xxx@xxx.dev";
  const value = {
    loggedIn,
    setLoggedIn,
    authToken,
    setAuthToken,
    signingIn,
    setSigningIn,
    userName,
    userEmail,
  };

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
}
