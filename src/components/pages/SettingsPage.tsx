import styles from "./SettingsPage.module.css";
import {
  FaClock,
  FaMoon,
  FaSun,
  FaTemperatureHigh,
  FaTrash,
  FaWind,
} from "react-icons/fa6";
import { FaAdjust, FaTachometerAlt } from "react-icons/fa";
import PageContainer from "./PageContainer";
import Card from "../ui/Card";
import SettingRow from "../ui/settings/SettingRow";
import Button from "../ui/Button";

import { usePreferences } from "../../contexts/settings/usePreferences";
import type { Option } from "../ui/Selector";
import type { Preferences } from "../../contexts/settings/type";

function SettingsPage() {
  const tempOptions: Option<Preferences["tempUnit"]>[] = [
    { label: "°C", value: "celcius" },
    { label: "°F", value: "fahrenheit" },
  ];

  const windOptions: Option<Preferences["windUnit"]>[] = [
    { label: "km/h", value: "kmh" },
    { label: "mph", value: "mph" },
    { label: "m/s", value: "ms" },
  ];

  const pressureOptions: Option<Preferences["pressureUnit"]>[] = [
    { label: "hPa", value: "hpa" },
    { label: "inHg", value: "inHg" },
  ];

  const hourOptions: Option<Preferences["hourFormat"]>[] = [
    { label: "12 H", value: "12" },
    { label: "24 H", value: "24" },
  ];

  const themeOptions: Option<Preferences["theme"]>[] = [
    {
      label: (
        <>
          <FaMoon />
        </>
      ),
      value: "dark",
    },
    {
      label: (
        <>
          <FaSun />
        </>
      ),
      value: "light",
    },
  ];

  const { preferences, dispatch } = usePreferences();

  return (
    <div>
      <PageContainer className={styles.pageContainer}>
        <section className={styles.section}>
          <h1>Unidades</h1>
          <Card className={styles.card}>
            <SettingRow
              icon={<FaTemperatureHigh />}
              title="Temperatura"
              options={tempOptions}
              value={preferences.tempUnit}
              onChange={(val) =>
                dispatch({ type: "changeTempUnit", payload: val })
              }
            />
            <SettingRow
              icon={<FaWind />}
              title="Velocidad del Viento"
              options={windOptions}
              value={preferences.windUnit}
              onChange={(val) =>
                dispatch({ type: "changeWindUnit", payload: val })
              }
            />
            <SettingRow
              icon={<FaTachometerAlt />}
              title="Presión"
              options={pressureOptions}
              value={preferences.pressureUnit}
              onChange={(val) =>
                dispatch({ type: "changePressureUnit", payload: val })
              }
            />
            <SettingRow
              icon={<FaClock />}
              title="Formato de Hora"
              options={hourOptions}
              value={preferences.hourFormat}
              onChange={(val) =>
                dispatch({ type: "changeHourFormat", payload: val })
              }
            />
          </Card>
        </section>

        <section className={styles.section}>
          <h1>Apariencia</h1>
          <Card className={styles.card}>
            <SettingRow
              icon={<FaAdjust />}
              title="Tema"
              options={themeOptions}
              value={preferences.theme}
              onChange={(val) =>
                dispatch({ type: "changeTheme", payload: val })
              }
            />
          </Card>
          <Button
            className={styles.resetButton}
            type="tertiary"
            onClick={() => dispatch({ type: "resetPreferences" })}
          >
            <span>
              <FaTrash /> Resetear todas las preferencias
            </span>
          </Button>
        </section>

        <footer>
          <img src="../../../public/favicon.png" alt="Lumen Weather Logo" />
          <h2>Lumen Weather V1.1.0</h2>
          <span>&copy; Andrew Zaragoza</span>
          <span>Powered by OpenWeather, Geoapify and Unsplash</span>
        </footer>
      </PageContainer>
    </div>
  );
}

export default SettingsPage;
