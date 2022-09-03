import { useState, useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Pagination from "../../common/Pagination";
import { useCookies } from "react-cookie";
import axios from "axios";
import Loading from "../../common/Loading";
import ItemCard from "./ItemCard";

const Myplace = (props) => {
  const [info, setInfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [pageCount, setPageCount] = useState([]);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const offset = (page - 1) * limit;
  console.log("pageInfo", page, offset); //현재 page 번호를 쿼리에 붙여서 api요청하도록 변경하기!
  const token = cookies.name; // 쿠키에서 id 를 꺼내기
  // 초기에 좋아요 목록 불러오기
  // const updateMyplace = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       "http://127.0.0.1:8000/users/like_place/",
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     console.log(response.data);
  //     setPageCount(response.data.count);
  //     setInfo(response.data.results);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log("Error >>", err);
  //   }
  // }, [token]);

  // // 페이지가 바뀔 때마다 api 요청 + setInfo 처리

  // // 초기에 좋아요 목록 불러오기
  // useEffect(() => {
  //   updateMyplace();
  // }, [updateMyplace]);

  const pageMyplace = async () => {
    console.log("page", page);
    let newPage;
    if (page == 1) {
      newPage = null;
    } else {
      newPage = page;
    }
    alert(token);
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/users/like_place/",

        {
          params: {
            page: newPage,
          },
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setPageCount(response.data.count);
      setInfo(response.data.results);
      setLoading(false);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  // 초기에 좋아요 목록 불러오기
  useEffect(() => {
    pageMyplace();
  }, [page]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
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
                  {info.slice(offset, offset + limit).map((info, index) => (
                    <Grid item key={info.id} xs={12} sm={12} md={6} lg={4}>
                      <CardSection>
                        <ItemCard
                          key={index}
                          id={info.id}
                          rep_pic={info.rep_pic}
                          place_name={info.place_name}
                          place_like={info.place_like}
                        />
                      </CardSection>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </main>
          </MyplaceSection>
          <FooterSection>
            <Pagination
              total={pageCount}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </FooterSection>
        </>
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

export default Myplace;
