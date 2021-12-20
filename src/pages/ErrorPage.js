import styled from "styled-components";

const ErrorPage = () => {
  return (
    <Error>
      <div>
        <h1>Oops...</h1>
        <p>Looks like there was some kind of error.</p>
        <p>Please try again later.</p>
        <button className="btn">Back</button>
      </div>
    </Error>
  );
};

const Error = styled.body`
  height: 100vh;
  display: grid;
  place-items: center;
  background: var(--very-dark-blue);

  h1 {
    font-size: 6rem;
    margin-bottom: 3rem;
  }

  p {
    font-size: 2.4rem;
    margin-bottom: 3rem;
  }
`;

export default ErrorPage;
