import React, { useState, useContext, useEffect, useCallback } from "react";

import Clear from "./img/Clear.png";
import Hail from "./img/Hail.png";
import HeavyCloud from "./img/HeavyCloud.png";
import HeavyRain from "./img/HeavyRain.png";
import LightCloud from "./img/LightCloud.png";
import LightRain from "./img/LightRain.png";
import Shower from "./img/Shower.png";
import Sleet from "./img/Sleet.png";
import Snow from "./img/Snow.png";
import Thunderstorm from "./img/Thunderstorm.png";

const images = {
  Clear,
  Hail,
  "Heavy Cloud": HeavyCloud,
  "Heavy Rain": HeavyRain,
  "Light Cloud": LightCloud,
  "Light Rain": LightRain,
  Showers: Shower,
  Sleet,
  Snow,
  Thunderstorm,
};

const cors = "https://cors-anywhere.herokuapp.com/";
const url_city = `${cors}https://www.metaweather.com/api/location/search/?query=`;
const url_geoLocation = `${cors}https://www.metaweather.com/api/location/search/?lattlong=`;
const url_location = `${cors}https://www.metaweather.com/api/location/`;

const getLocalStorage = () => {
  let list = localStorage.getItem("recent");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("recent")));
  } else {
    return [];
  }
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(getLocalStorage());
  const [weather, setWeather] = useState({});
  const [defUnit, setDefUnit] = useState("C");

  const getWoeid = async (url) => {
    setLoading(true);

    try {
      const data = await fetch(url);
      const response_data = await data.json();

      return response_data[0].woeid;
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    return undefined;
  };

  const fetchData = useCallback(
    async (url) => {
      setLoading(true);

      const woeid = await getWoeid(url);

      try {
        const data = await fetch(`${url_location}${woeid}/`);
        const response_data = await data.json();

        setWeather(response_data);

        //3(slice) last(reverse) unique(new Set) recent searches
        const temp = [...new Set([...recentSearches, query])]
          .reverse()
          .slice(0, 3);

        setRecentSearches(temp);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    },
    [query, recentSearches]
  );

  //ask for current location info, if user refuses set default city(London)
  const currentLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        const response = await fetch(`${url_geoLocation}${lat},${long}`);
        const response_data = await response.json();

        if (response_data) {
          setQuery(response_data[0].title.toLowerCase());
        }
      });
    } else {
      setQuery("london");
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const convertTempUnit = (temp) => {
    if (defUnit === "F") {
      return Math.round(Math.round(temp) * 1.8 + 32);
    }

    return Math.round(temp);
  };

  //ask for current location weather on first and only first render
  useEffect(() => {
    currentLocation();
  }, []);

  //fetch weather info every time user changes city name
  useEffect(() => {
    fetchData(`${url_city}${query}`);
  }, [query, fetchData]);

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recentSearches));
  }, [recentSearches]);

  return (
    <AppContext.Provider
      value={{
        loading,
        weather,
        images,
        isSidebarOpen,
        closeSidebar,
        openSidebar,
        setQuery,
        recentSearches,
        currentLocation,
        defUnit,
        setDefUnit,
        convertTempUnit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
