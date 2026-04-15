export type Preferences = {
  tempUnit: "celcius" | "fahrenheit";
  windUnit: "ms" | "kmh" | "mph";
  pressureUnit: "hpa" | "inHg";
  hourFormat: "12" | "24";
  theme: "dark" | "light";
};

export type Action =
  | { type: "changeTempUnit"; payload: Preferences["tempUnit"] }
  | { type: "changeWindUnit"; payload: Preferences["windUnit"] }
  | { type: "changePressureUnit"; payload: Preferences["pressureUnit"] }
  | { type: "changeHourFormat"; payload: Preferences["hourFormat"] }
  | { type: "changeTheme"; payload: Preferences["theme"] }
  | { type: "resetPreferences" };

export type SettingsContextType = {
  preferences: Preferences;
  dispatch: React.Dispatch<Action>;
};
