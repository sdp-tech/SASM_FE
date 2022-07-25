import * as React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { useNavigate } from "react-router";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      1 2 3 4 5 6 7 8 9 10
    </Typography>
  );
}

const cards = [1];

const theme = createTheme();

const StoryList = (props) => {
  const viewPage = () => {
    window.location.href = "/detail"; //replace는 뒤로가기 불가능, href는 가능
  };
  const navigate = useNavigate();

  return (
    <StorySection>
      <main>
        {/* <Container sx={{ py: 10, backgroundColor: "red" }} maxWidth="lg"> */}
        <Container
          sx={{
            backgroundColor: "red",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            //             row-gap(grid-row-gap)	행과 행 사이의 간격(Line)을 정의
            // column-gap(grid-column-gap)
          }}
          maxWidth="800px"
        >
          <Grid container spacing={4}>
            {cards.map((card) => (
              //   <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
              <Grid item key={card} xs={12} sm={12} md={12} lg={6}>
                <Card
                  sx={{
                    minHeight: "300px",
                    minWidth: "600px",
                    maxHeight: "300px",
                    maxWidth: "600px",
                    // backgroundColor: "red",
                    display: "flex",
                    flexDirection: "row",
                    // justifyContent: "center",
                    alignItems: "center",
                    // p: 1,
                    // m: 1,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      16: 9,
                      minHeight: "300px",
                      minWidth: "300px",
                      maxHeight: "300px",
                      maxWidth: "300px",
                      //   pt: "56.25%",
                      display: "flex",
                      //   flexDirection: "column",
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />

                  <CardContent
                    sx={{
                      // flexGrow: 1,
                      minHeight: "300px",
                      minWidth: "300px",
                      maxHeight: "300px",
                      maxWidth: "300px",
                      display: "flex",
                      flexFlow: "column",
                      // flexFlow: "row nowrap",
                      // justifyContent: "flex-end",
                      // alignItems: "center" /* 하위 요소들 수직 가운데정렬 */,
                      position: "relative",
                    }}
                  >
                    {/* 제목, 식당이름, 장소 카테고리, 장소 옵션들, 미리보기(preivew) */}
                    <Typography gutterBottom variant="h5" component="h2">
                      {props.mainTitle}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      식당이름
                    </Typography>
                    <Typography>장소 카테고리</Typography>
                    <Typography>장소 옵션들</Typography>
                    <br />
                    <br />
                    <Typography>내용</Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button
                      onClick={() => {
                        // 서버에서 쿼리처리!!
                        navigate("/detail");
                      }}
                      size="small"
                    >
                      View
                    </Button> */}
                    {/* <Button size="small"> */}
                    {/* <FavoriteBorderRoundedIcon sx={{ mr: 2 }} /> */}
                    {/* </Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </StorySection>
  );
};

const StorySection = styled.div`
  position: relative;
  //   margin: 15px 0px 15px 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  grid-area: story;
  //   border: 1px solid green;
`;
export default StoryList;
