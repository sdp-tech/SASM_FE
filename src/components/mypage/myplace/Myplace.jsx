import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import Pagination from "../../common/Pagination";
import HeartButton from "../../common/Heart";
import { useCookies } from "react-cookie";
import axios from "axios";
import Loading from "../../common/Loading";

const Myplace = (props) => {
  const [info, setInfo] = useState([]);
  const [like, setLike] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const offset = (page - 1) * limit;

  // 좋아요 클릭 이벤트
  const toggleLike = async (id) => {
    const token = cookies.name; // 쿠키에서 id 를 꺼내기

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/places/place_like/",
        { id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response", response);

      // setState({
      //   loading: true,
      //   ItemList: response.detailInfo.results,
      // });
    } catch (err) {
      console.log("Error >>", err);
    }

    //색상 채우기
    // setLike(!like);
  };

  // 초기에 좋아요 목록 불러오기
  async function updateMyplace() {
    const token = cookies.name; // 쿠키에서 id 를 꺼내기
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/like_place/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInfo(response.data.results);
      setLoading(false);
    } catch (err) {
      console.log("Error >>", err);
    }

    // //색상 채우기
    // setLike(!like);
  }
  console.log("info", info);
  // 초기에 좋아요 목록 불러오기
  useEffect(() => {
    updateMyplace();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <MyplaceSection>
            <span
              style={{ fontWeight: "500", fontSize: "1.6em", color: "#000000" }}
            >
              MY PLACE
            </span>

            <main>
              <Container
                sx={{
                  marginTop: "3%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100vw",
                }}
                maxWidth="xl"
                minWidth="xl"
              >
                <Grid container spacing={3}>
                  {info.slice(offset, offset + limit).map((info) => (
                    <Grid item key={info.id} xs={12} sm={12} md={6} lg={4}>
                      <CardSection>
                        <Card
                          sx={{
                            minHeight: "250px",
                            minWidth: "350px",
                            maxHeight: "250px",
                            maxWidth: "350px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              // 16: 9,
                              minHeight: "200px",
                              minWidth: "350px",
                              maxHeight: "200px",
                              maxWidth: "350px",
                              display: "flex",
                            }}
                            image={info.rep_pic}
                            alt="placeImage"
                          />

                          <CardContent
                            sx={{
                              minHeight: "100px",
                              minWidth: "310px",
                              maxHeight: "100px",
                              maxWidth: "310px",
                              display: "flex",
                              flexFlow: "column",
                              position: "relative",
                            }}
                          >
                            <StoreNameBox>
                              <Typography
                                gutterBottom
                                variant="h5"
                                fontSize="21px"
                                fontFamily={"kopub"}
                                fontWeight="500"
                              >
                                {info.place_name}
                              </Typography>
                              <LikeButton>
                                {/* {info.place_like === "ok" ? (
                                  <HeartButton
                                    like={!like}
                                    onClick={() => toggleLike(info.id)}
                                  />
                                ) : (
                                  <HeartButton
                                    like={like}
                                    onClick={() => toggleLike(info.id)}
                                  />
                                )} */}
                                {/* <HeartButton
                                  like={!like}
                                  onClick={() => toggleLike(info.id)}
                                /> */}
                                <HeartButton
                                  like={!like}
                                  onClick={() => toggleLike(info.id)} //이렇게 해야 id파라미터 해당 값만 전달됨
                                  // onClick={setLike(!like)} 이렇게 해야 해당 값만 변경됨
                                />
                              </LikeButton>
                            </StoreNameBox>
                          </CardContent>
                        </Card>
                      </CardSection>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </main>
          </MyplaceSection>
          <FooterSection>
            <Pagination
              total={info.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </FooterSection>
        </div>
      )}
    </>
  );
};

const MyplaceSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // overflow: hidden;
  grid-area: story;
  height: 100%;
  // height: auto;
  // border: 1px solid yellow;
`;
const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: story;
  height: 12%;
`;
const CardSection = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  grid-area: story;
  justify-content: center;
  align-items: center;
`;

const StoreNameBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  color: #000000;
  flex-direction: row;
  justify-content: space-between;
`;
// 기존에 존재하는 버튼에 재스타일
const Button = styled.button`
  height: 50px;
  font-size: 20px;
  font-weight: 700;
  background: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const LikeButton = styled(Button)({
  boxSizing: "border-box",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30px",
  width: "30px",
});

export default Myplace;
