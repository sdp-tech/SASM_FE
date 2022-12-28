import React from "react";
import styled from "styled-components";

const CategoryCheckBox = styled.div`
  margin : 2% 0 1% 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 0.7%;
`;
const CategoryLabelWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content:center;
  align-items: center;
  padding: 1%;
`;
const CategoryLabel = styled.label`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  text-align: center;
  font-size: 12px;
`
const CategoryImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px #99a0b0 solid;
  border-radius: 50%;
  width: 3vw;
  height: 3vw;
  @media screen and (max-width: 768px) {
    width:10vw;
    height: 10vw;
  }
  &:hover {
    background-color:#44ADF7;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.25);
    img {
        filter: invert(100);
    }
  }
`
const CategoryNameWrapper = styled.div`
  margin-top: 5%;
  font-size: 0.65rem;
  @media screen and (max-width: 768px) {
    font-size: 0.65rem;
  }
`
const CategoryCheckInput = styled.input`
  display: none;
  &:checked + ${CategoryLabel} > ${CategoryImageWrapper} {
    background-color: #44ADF7;
  }
  &:checked + ${CategoryLabel} > ${CategoryImageWrapper} > img {
    filter: invert(100);
  }
`

export const CATEGORY_LIST = [
    { id: 0, data: "식당 및 카페", name: "식당·카페" },
    { id: 1, data: "전시 및 체험공간", name: "전시·체험" },
    { id: 2, data: "제로웨이스트 샵", name: "제로웨이스트" },
    { id: 3, data: "도시 재생 및 친환경 건축물", name: "건축물" },
    { id: 4, data: "복합 문화 공간", name: "복합문화" },
    { id: 5, data: "녹색 공간", name: "녹색공간" },
];

export function MatchCategory(data) {
    for (let i = 0; i < 6; i++) {
        if (CATEGORY_LIST[i].data == data) {
            return i;
        }
    }
}

export default function CategorySelector({checkedList, onCheckedElement}) {
    return (
        <CategoryCheckBox>
            {CATEGORY_LIST.map((item) => {
                return (
                    <CategoryLabelWrapper key={item.id}>
                        <CategoryCheckInput
                            type="checkbox"
                            // 이때 value값으로 data를 지정해준다.
                            value={item.data}
                            // onChange이벤트가 발생하면 check여부와 value(data)값을 전달하여 배열에 data를 넣어준다.
                            onChange={(e) => {
                                onCheckedElement(e.target.checked, e.target.value);
                            }}
                            // 체크표시 & 해제를 시키는 로직. 배열에 data가 있으면 true, 없으면 false
                            checked={checkedList.includes(item.data) ? true : false}
                            id={`category${item.id}`}
                        />
                        <CategoryLabel htmlFor={`category${item.id}`}>
                            <CategoryImageWrapper>
                                <img src={require(`../../assets/img/Category/Category${item.id}.svg`)} style={{ width: '60%' }} />
                            </CategoryImageWrapper>
                            <CategoryNameWrapper>{item.name}</CategoryNameWrapper>
                        </CategoryLabel>
                    </CategoryLabelWrapper>
                );
            })}
        </CategoryCheckBox>
    )
}
