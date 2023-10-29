import React from 'react'
import styled from 'styled-components';

const StoryText = styled.div`
    margin-top: 5%;
    display: flex;
    justify-content: center;
`
const StoryList = styled.div`
    border-bottom:1px black solid;
    padding:3px;
    padding-left:10px;
    width:70%;
    margin:10px auto;
    display: flex;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`
const Title = styled.div`
    // float: left;
    cursor: pointer;
    @media screen and (max-width: 768px) {
        width: 65%;
    }
`
const Date = styled.div`
    margin-left: auto;
`
const goToStory = (id) => {
    window.location.href = `/story/${id}`
};

export default function SamePlaceStory(props) 
{
    const data = props.data;
    return (
        <div>
            <StoryText>
                <div>&nbsp;이 장소의 다른 스토리도 둘러보세요</div>
            </StoryText>
            <br></br><br></br>
            {data.map((it, index) => (
                <StoryList key={index}>
                    <Title onClick={(e) => { goToStory(it.id) }}>{it.title}</Title>
                    <Date>{it.created.slice(0,10)}</Date>
                </StoryList>
            ))}
            <br></br><br></br>
        </div>
    )
}
