import { FC, useCallback, useEffect, useState } from "react";
import { CityType, WeatherType } from "./Types";

type WeatherPropsType = {
  city?: string;
};

export const Weather: FC<WeatherPropsType> = ({ city }) => {
  const [cityWeatherInfo, setCityWeatherInfo] = useState<WeatherType>();
  const [isLoadingWeatherInfo, setIsLoadingWeatherInfo] = useState(false);

  const getCoordinationOfCity = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=4c4f0b1876954338598a7be96c66527b`
      );
      const data = await res.json();
      return data[0] as CityType;
    } catch (error) {
      alert(error);
    }
  };

  const getWeatherOfCity = useCallback(async (city: string) => {
    try {
      setIsLoadingWeatherInfo(true);
      const coordination = await getCoordinationOfCity(city);
      if (!coordination) {
        setIsLoadingWeatherInfo(false);
        return;
      }
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordination.lat}&lon=${coordination.lon}&units=metric&appid=4c4f0b1876954338598a7be96c66527b`
      );
      const weather: WeatherType = await weatherRes.json();
      setCityWeatherInfo(weather);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoadingWeatherInfo(false);
    }
  }, []);

  useEffect(() => {
    if (city) {
      getWeatherOfCity(city);
    }
  }, [city, getWeatherOfCity]);

  if (isLoadingWeatherInfo) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {!!cityWeatherInfo && (
        <>
          <h1>{cityWeatherInfo.name}</h1>
          <p>{Math.floor(cityWeatherInfo.main.temp)} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${cityWeatherInfo.weather[0].icon}@2x.png`}
            alt="Icon"
          />
        </>
      )}
    </>
  );
};
