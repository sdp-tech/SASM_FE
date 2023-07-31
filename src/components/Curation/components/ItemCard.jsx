import React, {useState} from 'react';
import styled from 'styled-components';
import { CardMedia } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import Request from '../../../functions/common/Request';
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
  }
  font-size: 1.25rem;
`;

const CardWrapper = styled.div`
  position: relative;
  cursor: pointer;
`

export default function ItemCard(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const width = isMobile ? "60vw" : "15vw";
  const height = isMobile ? "60vw" : "15vw";
  return (
    <CardWrapper>
      <CardMedia
      component="img"
      sx={{
        16: 9,
        minHeight: height,
        minWidth: width,
        maxHeight: height,
        maxWidth: width,
        display: "flex",
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
