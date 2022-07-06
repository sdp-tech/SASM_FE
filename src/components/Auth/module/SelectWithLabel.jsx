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
  font-weight: 700;
  font-size: 14px;
  color: black;
  margin-bottom: 0.25rem;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`

const Select = styled.select`
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 4px;
  line-height: 2.5rem;
  font-size: 1rem;
  flex-grow: 1;
  padding: 0.4em;
  & + & {
    margin-left: 1em;
  }
  box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08);
`;

const SelectWithLabel = ({label, item1, item2, item3}) => (
  <Wrapper>
    <Label>{label}</Label>
    <SelectWrapper>
      <Select >
        {item1.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </Select>

      <Select >
        <option value="default" disabled>년도</option>
        {item2.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </Select>

      <Select >
        {item3.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  </Wrapper>
);

export default SelectWithLabel;