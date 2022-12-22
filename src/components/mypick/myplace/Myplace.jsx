import { useState, useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Pagination from "../../common/Pagination";
import { useCookies } from "react-cookie";
import Loading from "../../common/Loading";
import ItemCard from "./ItemCard";
import nothingIcon from "../../../assets/img/nothing.svg";
import { useNavigate } from "react-router-dom";
import Request from "../../../functions/common/Request";
import ChangeMode from "../../../assets/img/Mypick/ChangeMode.svg"
import { CATEGORY_LIST, MatchCategory } from "../../common/Category";

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
const CategoryCheckBox = styled.div`
  position: absolute;
  right: 10vw;
  top: -5%;
  display: flex;
`;
const CategoryLabelWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content:center;
  align-items: center;
  padding: 1%;
`;
const CategoryLabel = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  text-align: center;
  font-size: 12px;
`
const CategoryImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px #99a0b0 solid;
  border-radius: 50%;
  width: 4vw;
  height: 4vw;
  @media screen and (max-width: 768px) {
    width:10vw;
    height: 10vw;
  }
`
const CategoryNameWrapper = styled.div`
  margin-top: 5%;
  font-size: 0.65rem;
  @media screen and (max-width: 768px) {
    font-size: 0.65rem;
  }
`

const Myplace = (props) => {
  const [info, setInfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [checkedList, setCheckedList] = useState('');
  
  const offset = (page - 1) * limit;
  //console.log("pageInfo", page, offset); 현재 page 번호를 쿼리에 붙여서 api요청하도록 변경하기!
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  // onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
  const onCheckedElement = (checked, item) => {
    if (checked) {
        setCheckedList([...checkedList, item]);
    } else if (!checked) {
        setCheckedList(checkedList.filter((el) => el !== item));
    }
  };
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
      //filter: checkedList
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
              <img src={ChangeMode} style={{ marginRight: '10px' }} />
              STORY
            </ChangeModeButton>
            <span style={{ fontWeight: "500", fontSize: "1.6rem", color: "#000000" }}>
              MY PLACE
            </span>
            <CategoryCheckBox>
              {CATEGORY_LIST.map((item) => {
                return (
                  <CategoryLabelWrapper key={item.id}>
                    <input
                      type="checkbox"
                      // 이때 value값으로 data를 지정해준다.
                      value={item.data}
                      // onChange이벤트가 발생하면 check여부와 value(data)값을 전달하여 배열에 data를 넣어준다.
                      onChange={(e) => {
                        onCheckedElement(e.target.checked, e.target.value);
                        if (e.target.checked) {
                          e.target.closest('div').style.color = 'red';
                        }
                        else {
                          e.target.closest('div').style.color = 'black';
                        }

                      }}
                      // 체크표시 & 해제를 시키는 로직. 배열에 data가 있으면 true, 없으면 false
                      checked={checkedList.includes(item.data) ? true : false}
                      id={`category${item.id}`}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor={`category${item.id}`}>
                      <CategoryLabel>
                        <CategoryImageWrapper>
                          <img src={require(`../../../assets/img/Category/Category${item.id}.svg`)} style={{ width: '60%' }} />
                        </CategoryImageWrapper>
                        <CategoryNameWrapper>{item.name}</CategoryNameWrapper>
                      </CategoryLabel>
                    </label>
                  </CategoryLabelWrapper>
                );
              })}
            </CategoryCheckBox>
            <main style={{ width: '100%' }}>
              <Container
                sx={{
                  marginTop: "3%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: '100%'
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
