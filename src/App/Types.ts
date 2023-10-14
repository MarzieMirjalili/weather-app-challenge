export type CityType = {
  country: string;
  lat: number;
  local_names: Record<string, string>;
  lon: number;
  name: string;
  state: string;
};

export type WeatherType = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
};
