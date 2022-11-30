import React from 'react'
import styled from 'styled-components';

const Comment = styled.div`
    border-bottom:1px black solid;
    padding:3px;
    padding-left:10px;
`

export default function Comments(props) {
    const data = props.data;
    console.log(data);
    console.log(data.count);
    let comments = [];
    for(let i =0; i<data.count; i++) {
        comments.push(<Comment>{data.results[i].content}</Comment>)
    }
    return (
        <>
            <div style={{width:"80%", margin:"10px auto", borderTop:'1px black solid'}}>
            {comments}
            </div>
        </>
    )
}
