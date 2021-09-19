import styled from "styled-components";

const PercentageBar = ({ width }) => {
  return (
    <Wrapper>
      <div className="scale">
        <small>0</small>
        <small>50</small>
        <small>100</small>
      </div>
      <Bar width={width} />
      <div className="percentage">
        <small>%</small>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4px auto;
  width: min(30rem, 90%);

  .scale {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .percentage {
    text-align: right;
    margin: 0;
  }

  small {
    font-size: 1.6rem;
    color: #a09fb1;
  }
`;

const Bar = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  background: white;

  margin: 4px 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #ffec65;
    width: ${(props) => props.width};
    height: 10px;
    border-radius: 5px;
  }
`;

export default PercentageBar;
