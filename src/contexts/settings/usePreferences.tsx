import { useContext } from "react";
import { SettingsContext } from "./SettingsContext";

export function usePreferences() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("usePreferences must be used within a SettingsProvider");
  }
  return context;
}
