import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import LikeImg from "../../../assets/img/LikeImg.png";
import Pagination from "./Pagination";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      1 2 3 4 5 6 7 8 9 10
    </Typography>
  );
}

const theme = createTheme();

const StoryList = (props) => {
  const viewPage = () => {
    window.location.href = "/detail"; //replace는 뒤로가기 불가능, href는 가능
  };
  const navigate = useNavigate();

  const infos = require("../data.json");
  console.log("info", infos.Story);
  const info = infos.Story;
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  return (
    <>
      <StorySection>
        <main>
          <Container
            sx={{
              // backgroundColor: "red",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //             row-gap(grid-row-gap)	행과 행 사이의 간격(Line)을 정의
              // column-gap(grid-column-gap)
            }}
            // maxWidth="800px"
            maxWidth="xl"
          >
            <Grid container spacing={2}>
              {info.slice(offset, offset + limit).map((info) => (
                <Grid item key={info.id} xs={12} sm={12} md={12} lg={6}>
                  <CardSection>
                    {/* <p className='cat'><Link to={`/category/${post.category}`}>{post.category}</Link></p> */}
                    <Link
                      to={`/story/${info.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        sx={{
                          minHeight: "300px",
                          minWidth: "600px",
                          maxHeight: "300px",
                          maxWidth: "600px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          // border: "1px solid black",

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
                          <TitleBox>
                            <Typography
                              gutterBottom
                              variant="h5"
                              fontSize="21px"
                              fontFamily={"kopub"}
                              fontWeight="400"
                            >
                              {info.mainTitle}
                            </Typography>
                          </TitleBox>

                          <StoreNameBox>
                            <Typography
                              gutterBottom
                              variant="h5"
                              fontSize="21px"
                              fontFamily={"kopub"}
                              fontWeight="600"
                            >
                              {info.storeName}
                            </Typography>
                          </StoreNameBox>

                          <CategoryBox>
                            <Typography
                              fontSize="14px"
                              fontFamily={"kopub"}
                              fontWeight="600"
                            >
                              {info.category}
                            </Typography>
                          </CategoryBox>

                          <OptionBox>
                            <Typography
                              fontSize="14px"
                              fontFamily={"kopub"}
                              fontWeight="600"
                            >
                              {info.options}
                            </Typography>
                          </OptionBox>

                          <ContentBox>
                            <Typography
                              fontSize="14px"
                              fontFamily={"kopub"}
                              fontWeight="600"
                            >
                              {info.content}
                            </Typography>
                          </ContentBox>
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
                    </Link>
                  </CardSection>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </StorySection>
      <FooterSection>
        <Pagination
          total={info.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </FooterSection>
    </>
  );
};

const StorySection = styled.div`
  position: relative;
  //   margin: 15px 0px 15px 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  grid-area: story;
  height: 90%;
  border: 1px solid green;
`;
const FooterSection = styled.div`
  position: relative;
  //   margin: 15px 0px 15px 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  grid-area: story;
  height: 20%;
  border: 1px solid red;
  position: sticky;
`;
const CardSection = styled.div`
  position: relative;
  //   margin: 15px 0px 15px 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  grid-area: story;
  justify-content: center;
  align-items: center;
  // border: 1px solid green;
`;

const TitleBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 90%;
  color: #6c6c6c;
  margin-top: 4%;
`;

const StoreNameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 90%;
  color: #000000;
  border-bottom: 0.7px solid #000000;
`;

const CategoryBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 90%;
  color: #000000;
  margin-top: 4%;
`;
const OptionBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 90%;
  color: #999999;
  padding-left: 2%;
  border-left: 2px solid #000000;
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  display: flex;
  margin-top: 22px;
  width: 90%;
  overflow: hidden;
  min-height: 86px;
  max-height: 86px;
  color: #797979;
  // border: 2px solid #000000;
`;
export default StoryList;
