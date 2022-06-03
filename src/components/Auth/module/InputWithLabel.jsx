import React from "react";
import styled from "styled-components";
import oc from "open-color";

const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
  display: flex;
  justify-content: center;
`;

const Label = styled.div`
  font-size: 1rem;
  color: ${oc.gray[6]};
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 4px;
  line-height: 2.5rem;
  font-size: 1.2rem;

  ::placeholder {
    color: ${oc.gray[3]};
  }

  box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08);
`;

const InputWithLabel = ({label, ...rest}) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input {...rest}/>
  </Wrapper>
);

export default InputWithLabel;