import React from "react";
import Styled from "styled-components";

export default function SearchForm({ changeHandler }) {
  return (
    <Div>
      <label htmlFor="enter">
        Search For...
        <Input
          id="enter"
          type="text"
          name="text"
          onChange={changeHandler}
        ></Input>
      </label>
    </Div>
  );
}

const Input = Styled.input`

background: white;
display: flex;
justify-content: center;
border: 3px #4776E6 solid;

`;

const Div = Styled.div`
display: flex;
justify-content: center;
margin-top: 40px;
margin-bottom: 20px;
`;
