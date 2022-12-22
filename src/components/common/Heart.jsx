import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeartImg from "../../assets/img/FilledLike.svg";
import EmptyHeartImg from "../../assets/img/UnFilledLike.svg";

const Heart = styled.img`
    // css
    }
    width:25px;
    height:25px;
    
`;

const HeartButton = ({ like, onClick }) => {
  return <Heart src={like ? HeartImg : EmptyHeartImg} onClick={onClick} />;
};

export default HeartButton;
