import React from "react";
import styled from "styled-components";

const StorySelectButton = styled.div`
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding:0;
  position: absolute;
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
  position: relative;
  width: 50%;
  height: 75%;
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
                <img src={ info.rep_pic } style={{ width: 150, height: 150, margin: 'auto', marginRight: 20, position:"absolute", left:-20, borderRadius:15 }} />
                <TextBox>
                  <p style={{fontWeight:700, fontSize: 'px'}}>{info.place_name}</p>
                  <p style={{color: '#6C6C6C'}}>{info.title}</p>
                  <p style={{fontWeight:600}}>{info.category}</p>
                  <p style={{fontSize:'12px', fontWeight:600, color: '#6C6C6C',   paddingLeft: '1%', borderLeft: '2px solid #000000'}}>{info.semi_category}</p>
                  <p style={{fontSize:'14px', fontWeight:600, color: '#6C6C6C'}}>{info.preview}</p>
                  <MoreView style={{marginTop:'5px'}} onClick={()=>{window.open(`/story/${info.id}`)}}>더보기</MoreView>
                  <StorySelectButton style={{marginTop:'-30px'}} onClick={()=>{handleSelectedStory(info.id, info.rep_pic)}}>스토리 선택</StorySelectButton>
                </TextBox>
              </ItemCard>
            ))}
          </CardSection>
        </View>
      </View>
    </View>
  )
}

