import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: async () => {
      if (!coordinates) {
        throw new Error("Coordinates are required for weather data");
      }
      return await weatherAPI.getCurrentWeather(coordinates);
    },
    enabled: !!coordinates,
  });
}

export function useForeCastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: async () => {
      if (!coordinates) {
        throw new Error("Coordinates are required for forecast data");
      }
      return await weatherAPI.getForecast(coordinates);
    },
    enabled: !!coordinates,
  });
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: async () => {
      if (!coordinates) {
        throw new Error("Coordinates are required for location data");
      }
      return await weatherAPI.reverseGeocode(coordinates);
    },
    enabled: !!coordinates,
  });
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: async () => {
      if (!query) {
        throw new Error("Query is required for location search");
      } 
      return await weatherAPI.searchLocation(query); 
    },
    enabled: query.length >= 3,
  });
}
