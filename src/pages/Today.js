import styled from "styled-components";
import Moment from "react-moment";

import { BiCurrentLocation } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";

import { useGlobalContext } from "../context";
import SearchForm from "../components/SearchForm";

const Today = () => {
  const {
    weather,
    images,
    openSidebar,
    currentLocation,
    convertTempUnit,
    defUnit,
  } = useGlobalContext();
  let today;

  if (weather.consolidated_weather) {
    today = weather.consolidated_weather[0];

    return (
      <Wrapper>
        <div className="search">
          <button className="btn" onClick={openSidebar}>
            Search for places
          </button>
          <button className="icon-cont" onClick={currentLocation}>
            <BiCurrentLocation />
          </button>
        </div>
        <article className="weather">
          <div className="weather__background">
            <img
              src={images[today.weather_state_name]}
              alt={today.weather_state_name}
              className="weather__img"
            />
          </div>
          <div className="weather__info">
            <h3>
              {convertTempUnit(today.the_temp)}
              <span>{defUnit === "C" ? <>&#8451;</> : <>&#8457;</>}</span>
            </h3>
            <span>{today.weather_state_name}</span>
          </div>
          <div className="weather__location">
            <div className="date-info">
              <p>Today</p>
              <p>
                <Moment format={"ddd, D MMM"}>{today.applicable_date}</Moment>
              </p>
            </div>
            <div className="location-info">
              <h4>
                <IoLocationSharp /> {weather.title}
              </h4>
            </div>
          </div>
        </article>
        <SearchForm />
      </Wrapper>
    );
  }

  return null;
};

const Wrapper = styled.aside`
  position: fixed;
  width: var(--sidebar-width);
  height: 100%;

  background: var(--dark-blue);

  display: grid;
  grid-template-rows: auto 1fr;

  @media screen and (max-width: 870px) {
    position: relative;
    width: auto;
    padding-bottom: 3rem;
  }

  .search {
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon-cont {
      cursor: pointer;
      border: none;
      background: #6e707a;
      border-radius: 50%;
      width: 3.5rem;
      height: 3.5rem;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 2.7rem;
        height: 2.7rem;
        position: relative;
        fill: var(--text-color);
      }
    }
  }

  .weather {
    place-items: center;
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    &__background {
      width: 100%;
      background: linear-gradient(
          rgba(30, 33, 58, 0.9) 100%,
          rgba(30, 33, 58, 0.9) 100%
        ),
        url("/static/media/Cloud-background.f88244c2.png");
      background-size: cover;
    }

    &__img {
      position: relative;
      z-index: 10;
    }

    &__info {
      @media screen and (max-width: 870px) {
        margin-bottom: 4rem;
      }

      h3 {
        font-size: clamp(5rem, 10vw, 8rem);
        margin-bottom: 4rem;
      }
      span {
        font-size: clamp(3rem, 8vw, 4rem);
        color: #a09fb1;
      }
    }

    &__location {
      width: 40%;
      color: #88869d;

      @media screen and (max-width: 700px) {
        width: 50%;
      }

      @media screen and (max-width: 440px) {
        width: 70%;
      }

      .date-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
      }

      .location-info {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
`;

export default Today;
