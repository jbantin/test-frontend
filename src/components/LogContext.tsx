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
    }
  | undefined
>(undefined);

export function LogContextProvider({ children }: React.PropsWithChildren<{}>) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState("");
  const value = { loggedIn, setLoggedIn, authToken, setAuthToken };

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
}
