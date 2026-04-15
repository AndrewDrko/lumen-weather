import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import WeatherPage from "./components/pages/WeatherPage";
import MainLayout from "./components/layout/MainLayout";
import LocationsPage from "./components/pages/LocationsPage";
import SettingsPage from "./components/pages/SettingsPage";
import { LocationProvider } from "./contexts/locations/LocationContext";
import { WeatherProvider } from "./contexts/weather/WeatherContext";
import { SearchProvider } from "./contexts/search/SearchContext";
import { SettingsProvider } from "./contexts/settings/SettingsContext";

function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <LocationProvider>
          <SearchProvider>
            <WeatherProvider>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route index element={<Navigate replace to="weather" />} />
                  <Route path="/weather" element={<WeatherPage />} />
                  <Route path="/locations" element={<LocationsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
              </Routes>
            </WeatherProvider>
          </SearchProvider>
        </LocationProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}

export default App;
