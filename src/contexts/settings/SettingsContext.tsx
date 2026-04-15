import React, { createContext, useEffect, useReducer } from "react";
import {
  type SettingsContextType,
  type Action,
  type Preferences,
} from "./type";

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

function SettingsProvider({ children }: { children: React.ReactNode }) {
  const initialState: Preferences = {
    tempUnit: "celcius",
    windUnit: "ms",
    pressureUnit: "hpa",
    hourFormat: "12",
    theme: "dark",
  };

  function getInitialState(): Preferences {
    try {
      const stored = localStorage.getItem("preferences");
      return stored ? JSON.parse(stored) : initialState;
    } catch {
      return initialState;
    }
  }

  function reducer(state: Preferences, action: Action) {
    switch (action.type) {
      case "changeTempUnit":
        return { ...state, tempUnit: action.payload };
      case "changeWindUnit":
        return { ...state, windUnit: action.payload };
      case "changePressureUnit":
        return { ...state, pressureUnit: action.payload };
      case "changeHourFormat":
        return { ...state, hourFormat: action.payload };
      case "changeTheme":
        return { ...state, theme: action.payload };
      case "resetPreferences":
        return initialState;
      default:
        throw new Error("Action unknown");
    }
  }

  const [preferences, dispatch] = useReducer(
    reducer,
    initialState,
    getInitialState,
  );

  useEffect(() => {
    try {
      localStorage.setItem("preferences", JSON.stringify(preferences));
    } catch (err) {
      console.error("Error saving preferences", err);
    }
  }, [preferences]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", preferences.theme);
  }, [preferences.theme]);

  return (
    <SettingsContext.Provider value={{ preferences, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
