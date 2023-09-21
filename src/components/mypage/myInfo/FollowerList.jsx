import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../../common/Pagination';
import Request from '../../../functions/common/Request';
import SearchBar from '../../common/SearchBar';
import qs from "qs";
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
  // justify-content: center;
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
const FollowerImg = styled.img`
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
  align-items: center;
  transition: all .5s ease-in-out;
  &:hover {
    box-shadow: 3px 3px 3px 3px #999;
  }
`
const FollowerSection = styled.div`
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


const Follower = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const request = Request(navigate);
  const myEmail = localStorage.getItem("email");
  const [otherUser, setOtherUser] = useState({});
  const [open, setOpen] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const queryString = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const GetFollower = async () => {
    let newPage;
    if (queryString.page == 1) {
      newPage = null;
    } else {
      newPage = queryString.page;
    }
    const response = await request.get('/mypage/follower/', {
      page: newPage,
      email: myEmail,
      search_email: searchQuery
    });
    setFollowerList(response.data.data.results);
    setTotal(response.data.data.count);
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

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
      GetFollower();
    }, [searchQuery, queryString.page]);


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
      <FollowerSection>
      {open && <OtherUserData open = {open} userData = {otherUser} handleClose = {handleClose}/>}
        {
          followerList.length == 0 ? 
            <Wrapper>
              <p>당신을 팔로우 중인 유저가 없습니다</p>
            </Wrapper> :
            <UserWrapper>
            {
              followerList.map((user, index) => (
                <InfoWrapper>
                  <FollowerImg src={user.profile_image} onClick={() => {otherUserData(user.email)}}/>
                  <FollowWrapper onClick={() => {otherUserData(user.email)}}>
                    <p>{user.nickname}</p>
                    <p>{user.email}</p>
                  </FollowWrapper>
                </InfoWrapper>
              ))
            }
            </UserWrapper>
        }
      </FollowerSection>
      <FooterSection>
        <Pagination
          total={total}
          limit={limit}
          page={queryString.page}
        />
      </FooterSection>
    </InfoBox>
  )
}


export default Follower;