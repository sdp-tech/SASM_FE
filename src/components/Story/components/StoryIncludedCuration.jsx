import React from 'react'
import styled from 'styled-components';

const CurationText = styled.div`
    margin-top: 5%;
    display: flex;
    justify-content: center;
`
const CurationList = styled.div`
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
    &:hover {
        text-decoration: underline;
    }
`
const Date = styled.div`
    margin-left: auto;
`
const goToCurationStory = (id) => {
    window.location.href = `/curation/${id}`
};

export default function StoryInCuration(props) 
{
    const data = props.data;
    return (
        <div>
            <CurationText>
                <div style={{fontWeight:700}}>&nbsp;이 스토리가 포함된 큐레이션을 확인해보세요</div>
            </CurationText>
            <br></br><br></br>
            {data.map((it, index) => (
                <CurationList key={index}>
                    <Title onClick={(e) => { goToCurationStory(it.id) }}>{it.title}</Title>
                    <Date>{it.updated.slice(0, 10)}</Date>
                </CurationList>
            ))}
            <br></br><br></br>
        </div>
    )
}
