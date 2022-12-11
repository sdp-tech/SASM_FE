import React from "react";
import styled from "styled-components";
import oc from "open-color";

const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
  // background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  flex-grow: 3;
  
`;

const Label = styled.div`
  // font-size: 1rem;
  font-weight: 700;
  font-size: 14px;
  color: black;
  margin-bottom: 0.25rem;
  // background-color: black;
`;

const Input = styled.input`
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 4px;
  line-height: 2.5rem;
  font-size: 1rem;
  // padding-left: 10px; 
  ::placeholder {
    padding: 4px;
    color: rgba(17, 17, 17, 0.48);
  }
  padding: 0.2em;
  box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08);
`;

const InputWithLabel = ({label, message, ...rest}) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input {...rest}/>
  </Wrapper>
);

export default InputWithLabel;