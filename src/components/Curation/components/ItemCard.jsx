import React from 'react';
import styled from 'styled-components';
import { CardMedia } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import Typography from "@mui/material/Typography";


const StoreNameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
  width: 100%;
  color: #6C6C6C;
  @media screen and (max-width: 768px) {
    width:100%;
    margin: 0;
    font-size: 0.5rem;
  }
  font-size: 1.2rem;
  &:hover {
    color: #8C8CFF;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  text-align: center;
  &:hover {
    transform: scale(1.02);
  }
`

export default function ItemCard(props) {
  return (
    <CardWrapper>
      <CardMedia
      component="img"
      sx={{
        16: 9,
        minHeight: '15vw',
        minWidth: '15vw',
        maxHeight: '15vw',
        maxWidth: '15vw',
        // display: "flex",
        borderRadius: "10%",
      }}
      image={props.rep_pic}
      alt="placeImage"
      />
      <StoreNameBox>  
        <Typography
            component={"span"}
            variant="p"
            fontFamily={"Pretendard"}
            fontWeight="700"
            margin="auto"
          >
            {props.title}
        </Typography>
      </StoreNameBox>
    </CardWrapper>
  )
}
