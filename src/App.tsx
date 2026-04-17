import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import MainLayout from "./components/layout/MainLayout";
import { LocationProvider } from "./contexts/locations/LocationContext";
import { WeatherProvider } from "./contexts/weather/WeatherContext";
import { SearchProvider } from "./contexts/search/SearchContext";
import { SettingsProvider } from "./contexts/settings/SettingsContext";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/ui/SpinnerFullPage";

const WeatherPage = lazy(() => import("./components/pages/WeatherPage"));
const LocationsPage = lazy(() => import("./components/pages/LocationsPage"));
const SettingsPage = lazy(() => import("./components/pages/SettingsPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
