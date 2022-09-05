import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Pagination from "../../common/Pagination";
import { useCookies } from "react-cookie";
import axios from "axios";
import ItemCard from "./ItemCard";
import Loading from "../../common/Loading";

const StoryList = (props) => {
  const viewPage = () => {
    window.location.href = "/detail"; //replace는 뒤로가기 불가능, href는 가능
  };
  const navigate = useNavigate();

  // const infos = require("../data.json");
  // console.log("info", infos.Story);
  // const info = infos.Story;
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
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
    setLoading(true);
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
      setLoading(false);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  useEffect(() => {
    loadItem();
  }, [page]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <StorySection>
            <main>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                maxWidth="xl"
              >
                <Grid container spacing={2}>
                  {info.map((info, index) => (
                    <Grid item key={info.id} xs={12} sm={12} md={12} lg={6}>
                      <CardSection>
                        <ItemCard
                          key={index}
                          id={info.id}
                          rep_pic={info.rep_pic}
                          title={info.title}
                          place_name={info.place_name}
                          category={info.category}
                          semi_category={info.semi_category}
                          preview={info.preview}
                          story_like={info.story_like}
                        />
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
      )}
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

export default StoryList;
