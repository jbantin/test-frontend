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
    }
  | undefined
>(undefined);

export function LogContextProvider({ children }: React.PropsWithChildren<{}>) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const value = { loggedIn, setLoggedIn };

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
}
