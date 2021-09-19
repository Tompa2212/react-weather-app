import styled from "styled-components";
import PercentageBar from "./PercentageBar";

const Hightlight = (props) => {
  return (
    <Wrapper>
      <h4 className="hightlights__name">{props.name}</h4>
      <p className="hightlights__data">{props.value}</p>
      {props.name === "Humidity" && <PercentageBar width={props.value} />}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  text-align: center;
  padding: 3rem;
  background: var(--dark-blue);
  border-radius: 0.5rem;

  @media screen and (max-width: 1160px) {
    padding: 2rem;
  }

  h4 {
    font-weight: 400;
    font-size: 2.2rem;
    margin-bottom: 3rem;
  }

  p {
    font-size: 5.5rem;
    font-weight: bold;
    margin-bottom: 3rem;
  }

  span {
    font-size: 3rem;
    font-weight: normal;
  }

  .status {
    font-size: 2rem;
  }
`;

export default Hightlight;
