import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';

const ShortReview = styled.div`
    text-overflow: ellipsis;
    height: 100px;
    overflow: hidden;
    white-space: normal;
`

export default function UserReview(props) {
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
        setToggle(!toggle);
    }
    const data = props.reviewInfo;
  return (
    <div style={{border:'1px black solid'}}>
        <div>{data.place_name}</div>
        <div>{data.id}</div>
        {toggle?<div>{data.short_cur}</div>:<ShortReview>{data.short_cur}</ShortReview>}
        <button onClick={handleToggle}>{toggle?"접기":"자세히"}</button>
        <div style={{border:'1px red solid', display:'flex', justifyContent:'space-between'}}>
            <img src={data?.photos[0].image} style={{width:'150px', height:'150px'}}></img>
            <img src={data?.photos[1].image} style={{width:'150px', height:'150px'}}></img>
            <img src={data?.photos[2].image} style={{width:'150px', height:'150px'}}></img>
        </div>
    </div>
  )
}
