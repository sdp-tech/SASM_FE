import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { useCookies } from "react-cookie";
import axios from "axios";

const StoryList = (props) => {
  const viewPage = () => {
    window.location.href = "/detail"; //replace는 뒤로가기 불가능, href는 가능
  };
  const navigate = useNavigate();

  // const infos = require("../data.json");
  // console.log("info", infos.Story);
  // const info = infos.Story;
  const [info, setInfo] = useState([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const offset = (page - 1) * limit;
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const loadItem = async () => {
    let newPage;
    if (page == 1) {
      newPage = null;
    } else {
      newPage = page;
    }
    //토큰 만료 or 없을 경우
    let headerValue;
    if (token === undefined) {
      headerValue = `No Auth`;
    } else {
      headerValue = `Bearer ${token}`;
    }
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/stories/story_list/",
        {
          params: {
            page: newPage,
          },

          headers: {
            Authorization: headerValue,
          },
        }
      );
      console.log("data??", response.data);
      setPageCount(response.data.count);
      setInfo(response.data.results);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  useEffect(() => {
    loadItem();
  }, [page]);

  return (
    <>
      <StorySection>
        <main>
          <Container
            sx={{
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
              {info.map((info) => (
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
                          }}
                          // image="https://source.unsplash.com/random"
                          image={info.imgUrl}
                          alt="placeImage"
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
                              component={"span"}
                              gutterBottom
                              variant="h5"
                              fontSize="21px"
                              fontFamily={"kopub"}
                              fontWeight="400"
                            >
                              {info.title}
                            </Typography>
                          </TitleBox>

                          <StoreNameBox>
                            <Typography
                              component={"span"}
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
                              component={"span"}
                              fontSize="14px"
                              fontFamily={"kopub"}
                              fontWeight="600"
                            >
                              {info.category}
                            </Typography>
                          </CategoryBox>

                          <OptionBox>
                            <Typography
                              component={"span"}
                              fontSize="14px"
                              fontFamily={"kopub"}
                              fontWeight="600"
                            >
                              {info.options}
                            </Typography>
                          </OptionBox>

                          <ContentBox>
                            <Typography
                              component={"span"}
                              fontSize="14px"
                              fontFamily={"kopub"}
                              fontWeight="600"
                            >
                              {info.content}
                            </Typography>
                          </ContentBox>
                        </CardContent>
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
          total={pageCount}
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // overflow: hidden;
  grid-area: story;
  // height: 100%;
  height: auto;
  // border: 1px solid red;
`;
const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
  grid-area: story;
  height: 12%;
`;
const CardSection = styled.div`
  box-sizing: border-box;
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
