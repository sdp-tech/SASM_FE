import React from 'react'
import styled from 'styled-components';
import Comment from './Comment';

const CommentsBox = styled.div`
    width: 80%;
    margin: 10px auto;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

export default function Comments({data, setMode, setTarget, rerender}) {
    return (
        <CommentsBox>
            {data.results.map((data, index) => {
                return (
                    <Comment data={data} key={index} index={index} setMode={setMode} setTarget={setTarget} rerender={rerender}/>
                );
            })}
        </CommentsBox>
    )
}
