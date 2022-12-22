import { useState, useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Pagination from "../../common/Pagination";
import { useCookies } from "react-cookie";
import axios from "axios";
import Loading from "../../common/Loading";
import ItemCard from "./ItemCard";
import nothingIcon from "../../../assets/img/nothing.svg";
import { useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";
import ChangeMode from "../../../assets/img/Mypick/ChangeMode.svg"

const MyplaceSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5%;
  grid-area: story;
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
const NothingSearched = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ChangeModeButton = styled.span`
  display: flex;
  font-size: 1.25rem;
  position: absolute;
  left: 15vw;
  top: 1%;
  @media screen and (max-width: 768px) {
    left: 7vw;
    top: 0.5%;
    font-size: 1rem;
  }
`

const Myplace = (props) => {
  const [info, setInfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const offset = (page - 1) * limit;
  //console.log("pageInfo", page, offset); 현재 page 번호를 쿼리에 붙여서 api요청하도록 변경하기!
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);

  const pageMyplace = async () => {
    let newPage;
    if (page == 1) {
      newPage = null;
    } else {
      newPage = page;
    }

    setLoading(true);

    const response = await request.get("/users/like_place/", {
      page: newPage,
    }, null);

    setPageCount(response.data.data.count);
    setInfo(response.data.data.results);
    setLoading(false);
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
            <ChangeModeButton onClick={props.handleMode}>
              <img src={ChangeMode} style={{marginRight:'10px'}} />
              STORY
            </ChangeModeButton>
            <span style={{ fontWeight: "500", fontSize: "1.6rem", color: "#000000" }}>
              MY PLACE
            </span>

            <main style={{width:'100%'}}>
              <Container
                sx={{
                  marginTop: "3%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width:'100%'
                }}
              >
                <>
                  {info.length === 0 ? (
                    <NothingSearched>
                      <img
                        src={nothingIcon}
                        style={{ marginTop: "50%", paddingTop: "50%" }}
                      />
                      해당하는 장소가 없습니다
                    </NothingSearched>
                  ) : (
                    <Grid container spacing={3}>
                      {info.map((info, index) => (
                        <Grid item key={info.id} xs={12} sm={12} md={6} lg={4}>
                          <CardSection>
                            <ItemCard
                              key={index}
                              id={info.id}
                              rep_pic={info.rep_pic}
                              place_name={info.place_name}
                              place_like={info.place_like}
                              category={info.category}
                            />
                          </CardSection>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </>
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

export default Myplace;
