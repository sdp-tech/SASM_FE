import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import ReviewBox from './ReviewBox';

const ShortReview = styled.div`
    text-overflow: ellipsis;
    height: 100px;
    overflow: hidden;
    white-space: normal;
`

export default function UserReview(props) {
  const reviewInfo = props.reviewInfo;
  const email = localStorage.getItem("email");
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  }
  let review = [];
  for (let i = 0; i < reviewInfo.length; i++) {
    if (email == reviewInfo[i].writer) { review.push(<ReviewBox data={reviewInfo[i]} id={props.id} writer={true} />) }
    else { review.push(<ReviewBox data={reviewInfo[i]} id={props.id} writer={false} />) }
  }

  return (
    <div style={{borderTop:'1px black solid'}}>{review}</div>
  )
}
