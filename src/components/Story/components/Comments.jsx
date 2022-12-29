import React from 'react'
import styled from 'styled-components';
import Comment from './Comment';

const CommentsBox = styled.div`
    width: 80%;
    margin: 10px auto;
    border-top: 1px black solid;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

export default function Comments({data, setMode, setTarget}) {
    return (
        <CommentsBox>
            {data.results.map((data, index) => {
                return (
                    <Comment data={data} index={index} setMode={setMode} setTarget={setTarget}/>
                );
            })}
        </CommentsBox>
    )
}
