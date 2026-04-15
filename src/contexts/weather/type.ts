export type WeatherData = {
  weather: {
    name: string;
    clouds: Record<string, number>;
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      country: string;
    };
    timezone: number;
    dt: number;
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      description: string;
      icon: string;
      main: string;
    }[];
    coord: {
      lat: number;
      lon: number;
    };
  };
};

export type ForecastWeather = {
  main: string;
  description: string;
  icon: string;
};

export type ForecastItem = {
  dt_txt: string;
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: ForecastWeather[];
};

export type ForecastData = {
  forecast: {
    list: ForecastItem[];
    city: {
      timezone: number;
    };
  };
};

export type FullData = {
  weather: WeatherData["weather"];
  forecast: ForecastData["forecast"];
};

export interface WeatherContextType {
  data: FullData | null;
  // city: string;
  // coords: { lat: number; lon: number } | null;
  // setCity: (city: string) => void;
  // setCoords: Dispatch<SetStateAction<{ lat: number; lon: number } | null>>;
  error: string | null;
  loading: boolean;
}
