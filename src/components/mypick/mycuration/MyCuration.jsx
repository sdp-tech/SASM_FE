import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Pagination from "../../common/Pagination";
import Loading from "../../common/Loading";
import ItemCard from "./ItemCard";
import nothingIcon from "../../../assets/img/nothing.svg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Request from "../../../functions/common/Request";
import ChangeMode from "../../../assets/img/Mypick/ChangeMode.svg"
import CategorySelector from "../../common/Category";
import qs from 'qs';

const Container = styled.div`
  margin: 0 auto;
  margin-top: 3%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const MyplaceSection = styled.div`
  font-family: pretendard;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5%;
  grid-area: story;
`;
const HeaderSection = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-around;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
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
const ChangeModeButton = styled(Link)`
  width: 30%;
  text-align: center;
  font-size: 1.25rem;
  z-index: 3;
  color: inherit;
  text-decoration: none;
  @media screen and (max-width: 768px) {
    position: absolute;
    left: 0;
    top: 0;
  }
`
const FilterOptions = styled.div`
  width: 30%;
  visibility: hidden;
  @media screen and (max-width: 768px) {
    width: 100%;
    visibility: hidden;
  }
`
const MenuSection = styled.div`
  // display: flex;
  margin-top: 20px;
`
const MoveSection = styled.div`
  display: flex;
  flex-direction: column;
`

const MyCuration = (props) => {
  const [checkedList, setCheckedList] = useState('');
  const [info, setInfo] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(6);
  const location = useLocation();
  const queryString = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const request = Request(navigate);

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };

  const pageMyCuration = async () => {
    let newPage;
    if (queryString.page == 1) {
      newPage = null;
    } else {
      newPage = queryString.page;
    }

    setLoading(true);

    const response = await request.get("/mypage/my_liked_curation/", {
      page: newPage,
    }, null);

    setPageCount(response.data.data.length);
    setInfo(response.data.data);
    console.log(response.data.data);
    setLoading(false);
  };

  // 초기에 좋아요 목록 불러오기
  useEffect(() => {
    pageMyCuration();
  }, [queryString.page]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MyplaceSection>
            <span style={{ fontWeight: "500", fontSize: "1.6rem", color:"#000", marginBottom: "50px" }}>
              MY CURATION
            </span>
            <HeaderSection>
              <MoveSection>
                <MenuSection>
                  <ChangeModeButton to={`/mypick/mystory?page=1`}>
                    <img src={ChangeMode} style={{ marginRight: '10px' }} />
                    STORY
                  </ChangeModeButton>
                </MenuSection>
                <MenuSection>
                  <ChangeModeButton to={`/mypick/myplace?page=1`}>
                    <img src={ChangeMode} style={{ marginRight: '10px' }} />
                    PLACE
                  </ChangeModeButton>
                </MenuSection>
              </MoveSection> 
              <FilterOptions>
                <CategorySelector checkedList={checkedList} onCheckedElement={onCheckedElement} />
              </FilterOptions>
            </HeaderSection>
            <main style={{ width: '100%' }}>
              <Container>
                {info.length === 0 ? (
                  <NothingSearched>
                    <img
                      src={nothingIcon}
                      style={{ marginTop: "50%", paddingTop: "50%" }}
                    />
                    해당하는 장소가 없습니다
                  </NothingSearched>
                ) : (
                  <Grid container spacing={3} style={{ width: '100%' }}>
                    {info.map((info, index) => (
                      <Grid item key={info.id} xs={12} sm={12} md={6} lg={6}>
                        <CardSection>
                          <ItemCard
                            key={index}
                            id={info.id}
                            rep_pic={info.rep_pic}
                            title={info.title}
                            writer_nickname={info.writer_nickname}
                          />
                        </CardSection>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Container>
            </main>
          </MyplaceSection>
          <FooterSection>
            <Pagination
              total={pageCount}
              limit={limit}
              page={queryString.page}
            />
          </FooterSection>
        </>
      )}
    </>
  );
};

export default MyCuration;
