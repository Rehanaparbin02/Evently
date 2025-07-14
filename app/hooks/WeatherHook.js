import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const useWeather = (apiKey) => {
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoadingWeather(true);
        setWeatherError(null);

        // 1. Ask for location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') throw new Error('Location permission denied');

        // 2. Get coordinates
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // 3. Reverse geocode city
        const geo = await Location.reverseGeocodeAsync({ latitude, longitude });
        const cityName = geo?.[0]?.city || 'Your Location';

        // 4. Fetch current weather
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );
        const current = await currentRes.json();

        if (!current?.main || !current?.weather) {
          throw new Error('Invalid current weather data');
        }

        // 5. Fetch forecast for min/max (1st day only)
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );
        const forecast = await forecastRes.json();

        const todayTemps = forecast?.list
          ?.filter(entry => entry.dt_txt.includes('12:00:00'))
          ?.slice(0, 1)[0]?.main;

        const minTemp = todayTemps?.temp_min ?? current.main.temp_min;
        const maxTemp = todayTemps?.temp_max ?? current.main.temp_max;

        setWeatherData({
          temperature: Math.round(current.main.temp),
          customWeatherDescription: current.weather[0].description,
          weatherIcon: current.weather[0].main,
          cityName: cityName.toUpperCase(),
          minTemp: Math.round(minTemp),
          maxTemp: Math.round(maxTemp),
        });

        setLoadingWeather(false);
      } catch (err) {
        console.error('Weather error:', err.message);
        setWeatherError(err.message);
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, [apiKey]);

  return {
    ...weatherData,
    loadingWeather,
    weatherError,
  };
};

export default useWeather;
