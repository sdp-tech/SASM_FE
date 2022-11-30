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
    console.log(data);
    let review =[];
  return (
    <div>hello</div>
  )
}
