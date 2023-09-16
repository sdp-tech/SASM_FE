import React from "react";
import styled from "styled-components";

const StorySelectButton = styled.div`
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding:0;
  position: absolute;
  margin-top: -30px;
  right: 0px;
  top: 20px;
  background-color: none;
    --b: 0.1em;   /* the thickness of the line */
  --c: #1095c1; /* the color */
  
  color: #0000;
  padding-block: var(--b);
  background: 
    linear-gradient(var(--c) 50%,#000 0) 0% calc(100% - var(--_p,0%))/100% 200%,
    linear-gradient(var(--c) 0 0) 0% var(--_p,0%)/var(--_p,0%) var(--b) no-repeat;
  -webkit-background-clip: text,padding-box;
          background-clip: text,padding-box;
  transition: .3s var(--_s,0s) linear,background-size .3s calc(.3s - var(--_s,0s));

  &:hover {
    --_p: 100%;
    --_s: .3s;
  }
  @media screen and (max-width:768px) {
    font-size: 0.8rem;
    margin-top: -20px;
  }
`
const CardSection = styled.div`

`

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  border-color:rgba(112, 112, 112, 0.15);
  border-bottom-width: 1px;
  width: 45vw;
  height: 30vh;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`
const TextBox = styled.div`
  color: #000;
  position: absolute;
  @media screen and (max-width:768px) {
    width: 80%;
    height: 80%;
    top: 45px;
    right: -80px;
  }
  @media screen and (min-width:768px) and (max-width: 1023px) {
    width: 80%;
    height: 80%;
    top: 25px;
    right: -100px;
  }
  @media screen and (min-width:1024px) and (max-width:1200px) {
    width: 60%;
    height: 80%;
    top: 25px;
    right: -50px;
  }
  @media screen and (min-width:1200px) {
    width: 60%;
    height: 80%;
    top: 25px;
    right: -30px;
  }
`
const View = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 70%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  justify-content: center;
  margin: auto;
  margin-top: 5px;
`
const MoreView = styled.div`
  background-color: none;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.03);
    color: #1095c1;
  }
`

const RefPic = styled.img`
  width: 175px; 
  height: 175px;
  margin: auto;
  margin-right: 20px;
  position: absolute;
  left:-20px;
  border-radius: 15px;
  @media screen and (max-width: 767px) {
    width: 20vw;
    height: 20vw;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 20vw;
    height: 20vw;
  }
`
const PlaceName = styled.p`
  font-weight:700;
`

const Title = styled.p`
  color: #6C6C6C;
`

const SemiCategory = styled.p`
  font-size:12px;
  font-weight:600;
  color: #6C6C6C;
  padding-left: 1%;
  borderLeft: 2px solid #000000;
  @media screen and (min-width:768px) and (max-width:1023px) {
    font-size: 0.7rem;
  }
`

const Category = styled.p`
  font-weight:600;
`

const Preview = styled.p`
  font-size:14px;
  font-weight:600;
  color: #6C6C6C;
  @media screen and (max-width:767px) {
    display: none;
  }
  @media screen and (min-width:768px) and (max-width:1023px) {
    font-size: 0.5rem;
  }
  @media screen and (min-width:1024px) and (max-width:1200px) {
    font-size: 0.5rem;
  }
  @media screen and (min-width:1200px) {
    font-size: 0.5rem;
  }
`

export default function StoryListModal({ selectedStory, setSelectedStory, item}) {

  const handleSelectedStory = (id, rep_pic) => {
    if (selectedStory.filter(el => el.id == id).length > 0) {
      setSelectedStory(selectedStory.filter(el => el.id != id));
      if (window.confirm("목록에서 삭제하시겠습니까?")) {
        alert("삭제되었습니다.");
        }
      }
    else {
      setSelectedStory([...selectedStory, { id: id, rep_pic: rep_pic }]);
      alert("스토리 목록에 추가되었습니다.");  
    }
  }

  return (
    <View>
      <View>
        <View style={{ marginTop: 10}}>
          <CardSection>
            {item.map((info, index) => (
              <ItemCard>
                <RefPic src={ info.rep_pic } />
                <TextBox>
                  <PlaceName>{info.place_name}</PlaceName>
                  <Title>{info.title}</Title>
                  <Category>{info.category}</Category>
                  <SemiCategory>{info.semi_category}</SemiCategory>
                  <Preview>{info.preview}</Preview>
                  <MoreView style={{marginTop:'5px'}} onClick={()=>{window.open(`/story/${info.id}`)}}>더보기</MoreView>
                  <StorySelectButton  onClick={()=>{handleSelectedStory(info.id, info.rep_pic)}}>스토리 선택</StorySelectButton>
                </TextBox>
              </ItemCard>
            ))}
          </CardSection>
        </View>
      </View>
    </View>
  )
}

