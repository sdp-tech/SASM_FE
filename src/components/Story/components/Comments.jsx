import React from 'react'
import styled from 'styled-components';
import Comment from './Comment';


export default function Comments({data, setMode, setTarget}) {
    return (
        <div style={{ width: "80%", margin: "10px auto", borderTop: '1px black solid' }}>
            {data.results.map((data, index) => {
                return (
                    <Comment data={data} index={index} setMode={setMode} setTarget={setTarget}/>
                );
            })}
        </div>
    )
}
