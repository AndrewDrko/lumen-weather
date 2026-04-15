import TemperatureIndicator from "../ui/TemperatureIndicator";
import styles from "./WeatherPage.module.css";

import useWeather from "../../contexts/weather/useWeather";
import Card from "../ui/Card";
import DayForecast from "../ui/forecast/day/DayForecast";
import WeekForecast from "../ui/forecast/week/WeekForecast";
import MiniCard from "../ui/MiniCard";
import { FaCloud, FaDroplet, FaEye, FaWind } from "react-icons/fa6";
import {
  getPressureLabel,
  getWeatherLabel,
  pressureUnitConverter,
  tempUnitConverter,
  windUnitConverter,
} from "../../utils/helpers";
import { RiThunderstormsFill } from "react-icons/ri";
import Message from "../ui/Message";
import Spinner from "../ui/Spinner";

import { AiFillThunderbolt } from "react-icons/ai";
import PageContainer from "./PageContainer";
import { FaTachometerAlt } from "react-icons/fa";
import { usePreferences } from "../../contexts/settings/usePreferences";

function WeatherPage() {
  const { data, loading, error } = useWeather();
  const { preferences } = usePreferences();

  const unitMap = {
    wind: {
      ms: "m/s",
      kmh: "km/h",
      mph: "mph",
    },
    pressure: {
      hpa: "hPa",
      inHg: "inHg",
    },
  };

  console.log(data);

  if (loading)
    return (
      <PageContainer>
        <Spinner className={styles.spinner} />
      </PageContainer>
    );

  if (error)
    return (
      <PageContainer>
        <Message
          className={styles.message}
          messageHeader="Algo ha salido mal..."
          messageDescription="No se pudieron cargar los datos"
          icon={<AiFillThunderbolt />}
        />
      </PageContainer>
    );

  if (!data)
    return (
      <PageContainer>
        <Message
          className={styles.message}
          messageHeader="No hay una locación seleccionada..."
          messageDescription="Seleccione una locación para mostrar datos del clima"
          icon={<RiThunderstormsFill />}
        />
      </PageContainer>
    );

  return (
    <PageContainer>
      <TemperatureIndicator
        temperature={tempUnitConverter(
          data.weather.main.temp,
          preferences.tempUnit,
        )}
        coord={data.weather.coord}
        weatherState={data.weather.weather[0].description}
      />
      <Card className={styles.card}>
        <DayForecast />
      </Card>

      <Card className={styles.card}>
        <WeekForecast />
      </Card>

      <div className={styles.gridCards}>
        <Card className={styles.card}>
          <MiniCard
            title="Nubes"
            titleIcon={<FaCloud />}
            value={data.weather.clouds.all}
            unity="%"
            description={getWeatherLabel("clouds", data.weather.clouds.all)}
          />
        </Card>
        <Card className={styles.card}>
          <MiniCard
            title="Viento"
            titleIcon={<FaWind />}
            value={windUnitConverter(
              data.weather.wind.speed,
              preferences.windUnit,
            )}
            unity={unitMap.wind[preferences.windUnit]}
            windDegrees={data.weather.wind.deg}
            description={getWeatherLabel("wind", data.weather.wind.speed)}
          />
        </Card>
        <Card className={styles.card}>
          <MiniCard
            title="Humedad"
            titleIcon={<FaDroplet />}
            value={data.weather.main.humidity}
            unity="%"
            description={getWeatherLabel(
              "humidity",
              data.weather.main.humidity,
            )}
          />
        </Card>
        <Card className={styles.card}>
          <MiniCard
            title="Visibilidad"
            titleIcon={<FaEye />}
            value={data.weather.visibility / 1000}
            unity="MI"
            description={getWeatherLabel(
              "visibility",
              data.weather.visibility / 1000,
            )}
          />
        </Card>
        <Card className={styles.card}>
          <MiniCard
            title="Presión"
            titleIcon={<FaTachometerAlt />}
            value={pressureUnitConverter(
              data.weather.main.pressure,
              preferences.pressureUnit,
            )}
            unity={unitMap.pressure[preferences.pressureUnit]}
            description={getPressureLabel(data.weather.main.pressure)}
          />
        </Card>
      </div>
    </PageContainer>
  );
}

export default WeatherPage;
