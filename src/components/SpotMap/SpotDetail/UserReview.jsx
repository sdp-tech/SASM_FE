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
    const reviewInfo = props.reviewInfo;
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
        setToggle(!toggle);
    }
    let review =[];
    console.log(reviewInfo.length);
    for(let i =0; i<reviewInfo.length; i++) {
      review.push(<div>{reviewInfo[i].nickname} - {reviewInfo[i].contents} / {reviewInfo[i].created}</div>)
    }
  return (
    <div>{review}</div>
  )
}
