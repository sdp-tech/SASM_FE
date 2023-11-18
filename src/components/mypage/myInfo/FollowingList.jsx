import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from '../../common/Pagination';
import Request from '../../../functions/common/Request';
import SearchBar from '../../common/SearchBar';
import qs from "qs";
import { Button } from 'rsuite';
import OtherUserData from '../../../functions/common/OtherUserData';

const SearchWapper = styled.div`
box-sizing: border-box;
position: relative;
height: 12vh;
width: 100%;
display: flex;
margin-top: 5%;
align-items: center;
justify-content: center;
@media screen and (max-width: 768px) {
  margin-top: 3vh;
  flex-direction: column;
  height: 10vh;
  justify-content: space-between;
  align-items: center; 
}
`
const SearchFilterBar = styled.div`
  box-sizing: border-box;
  width: 75%;
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 4vh;
  }
  height: 50%;
  display: flex;
  background: #FFFFFF;
  border-radius: 56px;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;
const Wrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const FollowWrapper = styled(Wrapper)`
  cursor: pointer;
  &:hover {
    color: #00AFFF;
  }
`
const ButtonWrapper = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  font-size: 0.9rem;
  @media screen and (max-width: 768px) {
    font-size: 0.6rem;
    margin-left: 32px;
  }
`
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 110%;
  margin-top: 50px;
  margin: auto;
  align-items: center;
  position: relative;
`;
const FollowingImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 4px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`
const BackButton = styled.div`
  color: black;
  cursor : pointer;
  font-size: 1rem;
  transition: all .5s ease-in-out;
  &:hover {
    box-shadow: 3px 3px 3px 3px #999;
  }
`
const FollowingSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: colume;
  align-items: center;
`
const InfoWrapper = styled.div`
  display: flex;
`
const FooterSection = styled.div`
  display: flex;
  flex-direction: row;
  bottom: 0;
  width: 100%;
  position: relative;
  z-index: 20;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
`;



const Following = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const request = Request(navigate);
  const myEmail = localStorage.getItem("email");
  const [limit, setLimit] = useState(5);
  const [followingList, setFollowingList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [otherUser, setOtherUser] = useState({});
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [pageOneFlag, setPageOneFlag] = useState(false);
  const nickname = localStorage.getItem('nickname');
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const rerender = () => {
    setRefresh(!refresh);
  }

  const GetFollowing = async () => {
    const response = await request.get('/mypage/following/', {
      page: queryString.page,
      email: myEmail,
      search_email: searchQuery
    });
    setFollowingList(response.data.data.results);
    setTotal(response.data.data.count);
  }

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const undoFollowing = async (email) => {
    const response = await request.post('/mypage/follow/', { targetEmail: email });
    rerender();
  }

  const otherUserData = async (email) => {
    const response = await request.get('/mypage/user/', {
      email: email
    });
    setOtherUser(response.data.data);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    const params = {
       page: page,
       me: nickname
    };
    if (searchQuery) params.search = searchQuery;
    if ((page===1 && searchQuery)||page !== 1) {
      setSearchParams(params);
      setPageOneFlag(true);
    } else if (page === 1 && pageOneFlag) {
      setSearchParams(params);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    if (queryString.search||searchQuery=="") setPage(1);
  }, [queryString.search]);

  useEffect(() => {
      GetFollowing();
      if (parseInt(queryString.page) !== page) setPage(parseInt(queryString.page));
    }, [queryString.page, refresh, searchQuery]);

  return (
    <InfoBox style={{ backgroundColor: 'white' }}>
      <SearchWapper>
        <SearchFilterBar>
          <SearchBar
          search={searchQuery}
          onChangeSearch={onChangeSearch}
          style={{ width: '90%' }}
          placeholder='궁금한 프로필을 검색해보세요'
          keyboardType='email-address'
          />
        </SearchFilterBar>
      </SearchWapper>
      <BackButton style={{ left: 10, marginBottom: 18, display: 'flex', flexDirection: 'row', alignItems: 'center' }} onClick={() => { navigate("/mypage") }}>
        <p style={{ fontSize: 16, letteringSpace: -0.6 }} >Back To Mypage</p>
      </BackButton>
      <FollowingSection>
      {open && <OtherUserData open = {open} userData = {otherUser} handleClose = {handleClose}/>}
        {
          followingList.length == 0 ? 
            <Wrapper>
              <p>당신이 팔로우 중인 유저가 없습니다</p>
            </Wrapper> :
            <UserWrapper>
            {
              followingList.map((user, index) => (
                <InfoWrapper>
                  <FollowingImg src={user.profile_image} onClick={() => {otherUserData(user.email)}}/>
                  <FollowWrapper onClick={() => {otherUserData(user.email)}}>
                    <p>{user.nickname}</p>
                    <p>{user.email}</p>
                  </FollowWrapper>
                  <ButtonWrapper>
                    <Button onClick={()=>{undoFollowing(user.email)}}>팔로우 취소</Button>
                  </ButtonWrapper>
                </InfoWrapper>
              ))
            }
            </UserWrapper>
        }
      </FollowingSection>
      <FooterSection>
        <Pagination
          total={total}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </FooterSection>
    </InfoBox>
  )
}


export default Following;