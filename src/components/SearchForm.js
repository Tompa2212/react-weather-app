import styled from "styled-components";
import { useState } from "react";

import { GoSearch } from "react-icons/go";
import { RiArrowDropRightLine } from "react-icons/ri";
import { BsX } from "react-icons/bs";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { closeSidebar, isSidebarOpen, setQuery, recentSearches } =
    useGlobalContext();

  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setQuery(city.toLowerCase());
    setCity("");
  };

  return (
    <Wrapper className={isSidebarOpen ? "show-sidebar" : ""}>
      <form onSubmit={handleSubmit}>
        <div className="form-control input-cont">
          <GoSearch />
          <input
            type="text"
            name="location"
            id="location"
            placeholder="search location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {recentSearches.map((search, index) => {
        return (
          <button
            className="recent-search"
            key={index}
            value={search}
            onClick={(e) => setQuery(e.target.value)}
          >
            {search}
            <RiArrowDropRightLine />
          </button>
        );
      })}
      <button className="exit" onClick={closeSidebar}>
        <BsX />
      </button>
    </Wrapper>
  );
};

export default SearchForm;

const Wrapper = styled.aside`
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  z-index: 100;

  transform: translateX(-120%);
  transition: transform 500ms ease;

  padding: 8rem 4rem;
  background: var(--dark-blue);

  @media screen and (max-width: 400px) {
    padding: 8rem 2rem;
  }

  .exit {
    cursor: pointer;
    background: transparent;
    border: transparent;
    position: absolute;

    top: 2rem;
    right: 3rem;

    @media screen and (max-width: 400px) {
      right: 1rem;
    }

    svg {
      fill: var(--text-color);
      width: 4rem;
      height: 4rem;
    }
  }

  form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4rem;

    button {
      cursor: pointer;
      width: 23%;

      border: transparent;
      border-radius: 2px;
      background: #3c47e9;
      color: var(--text-color);
      font-size: inherit;
      font-family: inherit;
    }
  }

  .input-cont {
    width: 73%;
    border: 1px solid var(--text-color);
    border-radius: 2px;
    position: relative;

    input {
      width: 100%;
      padding: 1.4rem 0rem 1.4rem 5rem;

      background: transparent;
      border: none;

      color: var(--text-color);
      font-family: inherit;
      font-size: inherit;

      &::placeholder {
        color: #616475;
        font-size: inherit;
        font-family: inherit;
      }

      &:focus {
        outline: transparent;
      }
    }

    svg {
      position: absolute;
      top: 50%;
      left: 1.5rem;
      transform: translateY(-50%);

      width: 1.9rem;
      height: 1.9rem;
      fill: #616475;
    }
  }

  .recent-search {
    cursor: pointer;

    width: 100%;
    padding: 1.5rem 1rem;

    background: transparent;
    border: transparent;

    color: inherit;
    font-size: 1.8rem;
    font-family: inherit;
    text-transform: capitalize;

    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: border 300ms ease;

    &:hover {
      border: 1px solid #616475;
    }

    &:hover svg {
      opacity: 1;
    }

    svg {
      width: 4rem;
      height: 3rem;
      fill: #616475;
      opacity: 0;
      transition: opacity 300ms ease;
    }
  }
`;
