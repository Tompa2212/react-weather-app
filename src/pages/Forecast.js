import styled from "styled-components";
import Day from "../components/Day";
import Hightlight from "../components/Hightlight";
import { useGlobalContext } from "../context";

const Forecast = () => {
  const { weather, loading, setDefUnit, convertTempUnit } = useGlobalContext();

  let today, today_data, forecasts;

  if (weather.consolidated_weather) {
    today = weather.consolidated_weather[0];

    today_data = [
      {
        name: "Wind status",
        value: `${Math.trunc(today.wind_speed)}mph`,
      },
      {
        name: "Humidity",
        value: `${Math.trunc(today.humidity)}%`,
      },
      {
        name: "Visibility",
        value: `${Math.trunc(today.visibility)} miles`,
      },
      {
        name: "Air Pressure",
        value: `${today.air_pressure} mb`,
      },
    ];

    forecasts = weather.consolidated_weather.slice(1);

    if (loading) {
      return (
        <div className="loader">
          <div className="lds-dual-ring"></div>
        </div>
      );
    }

    return (
      <Wrapper>
        <div className="unit-switch">
          <button
            className="btn btn--round btn--active"
            style={{ marginRight: "1rem" }}
            onClick={() => setDefUnit("C")}
          >
            &#8451;
          </button>
          <button className="btn btn--round" onClick={() => setDefUnit("F")}>
            &#8457;
          </button>
        </div>
        <section className="forecast">
          {forecasts.map((forecast) => {
            const {
              id,
              min_temp,
              max_temp,
              applicable_date,
              weather_state_name,
            } = forecast;

            return (
              <Day
                min_temp={convertTempUnit(min_temp)}
                max_temp={convertTempUnit(max_temp)}
                date={applicable_date}
                key={id}
                weather={weather_state_name}
              />
            );
          })}
        </section>
        <section className="hightlights">
          <h2>Today's Hightlights</h2>
          <div className="hightlights__items">
            {today_data.map((item, index) => {
              return <Hightlight {...item} key={index} />;
            })}
          </div>
        </section>
      </Wrapper>
    );
  }

  return null;
};

const Wrapper = styled.main`
  padding: 3rem 5vw;

  @media screen and (min-width: 869px) {
    padding-top: 3rem;
    padding-right: 5vw;
    padding-bottom: 3rem;
    padding-left: calc(var(--sidebar-width) + 5vw);
  }

  .unit-switch {
    text-align: right;
    margin-bottom: 3rem;
  }

  .forecast {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    grid-gap: 2rem;
    margin-bottom: 6rem;
  }

  .hightlights {
    h2 {
      margin-bottom: 6rem;
      font-size: 3rem;
    }

    &__items {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 3rem;

      @media screen and (max-width: 1160px) {
        grid-gap: 2rem;
      }

      @media screen and (max-width: 1100px) {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default Forecast;
