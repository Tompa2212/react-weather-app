import styled from "styled-components";
import Moment from "react-moment";
import { useGlobalContext } from "../context";

const Day = ({ min_temp, max_temp, date, weather }) => {
  const { images, defUnit } = useGlobalContext();

  return (
    <Wrapper>
      <h3>
        <Moment format={"ddd, D MMM"}>{date}</Moment>
      </h3>
      <img src={images[weather]} alt="" />
      <div className="temps">
        <p>
          {max_temp}
          {defUnit === "C" ? <>&#8451;</> : <>&#8457;</>}
        </p>
        <span>
          {min_temp}
          {defUnit === "C" ? <>&#8451;</> : <>&#8457;</>}
        </span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
    padding: 2rem;
    background: var(--dark-blue);
    border-radius: 0.5rem;
    text-align: center;

    display: grid;
    grid-template-rows: auto 1fr auto;

    h3 {
      font-weight: 400;
      margin-bottom: 2rem;
    }

    img {
      justify-self: center;
      max-width: 10rem;
      margin-bottom: 2rem;
    }
  }

  .temps {
    display: flex;
    justify-content: space-between;

    span {
      color: #a09fb1;
    }
`;

export default Day;
