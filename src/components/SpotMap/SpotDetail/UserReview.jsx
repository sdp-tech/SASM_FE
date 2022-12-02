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
  const setMode = (mode) =>{
    props.setMode(mode);
  }
  const setReviewOpen = (mode) =>{
    props.setReviewOpen(mode);
  }
  const setTarget=(target)=> {
    props.setTarget(target);
  }
  const reviewInfo = props.reviewInfo;
  const email = localStorage.getItem("email");
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  }
  let review = [];
  for (let i = 0; i < reviewInfo.length; i++) {
    if (email == reviewInfo[i].writer) { review.push(<ReviewBox data={reviewInfo[i]} id={props.id} writer={true} setMode={setMode} setReviewOpen={setReviewOpen} setTarget={setTarget}/>) }
    else { review.push(<ReviewBox data={reviewInfo[i]} id={props.id} writer={false} setMode={setMode} setReviewOpen={setReviewOpen} setTarget={setTarget}/>) }
  }

  return (
    <div style={{borderTop:'1px black solid'}}>{review}</div>
  )
}
