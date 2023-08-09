import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import Request from '../../../functions/common/Request';
import SearchBar from '../../common/SearchBar';
import { Button } from 'rsuite';

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
    width: 80%;
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
  display: flex;
  flex-direction: column;
  margin: auto;
  // justify-content: center;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  margin-top: 50px;
  margin: auto;
  align-items: center;
  position: relative;
`;
const FollowingImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 3px;
  margin: 4px;
`
const BackButton = styled.div`
  color: black;
  cursor : pointer;
  font-size: 1rem;
  align-items: center;
`
const FollowingSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: colume;
  align-items: center;
`
const InfoWrapper = styled.div`
  display: flex;
`


const Following = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const navigate = useNavigate();
  const location = useLocation();
  const request = new Request(cookies, localStorage, navigate);
  const [myEmail, setMyEmail] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);

  const rerender = () => {
    setRefresh(!refresh);
  }

  const GetFollowing = async () => {
    const response = await request.get('/mypage/following/', {
      email: location.state,
      search_email: searchQuery
    });
    setFollowingList(response.data.data.results);
  }

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const undoFollowing = async (email) => {
    const response = await request.post('/mypage/follow/', { targetEmail: email });
    rerender();
  }

  useEffect(() => {
      GetFollowing();
    }, [searchQuery, refresh])


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
        {
          followingList.length == 0 ? 
            <Wrapper>
              <p>당신이 팔로우 중인 유저가 없습니다</p>
            </Wrapper> :
            <UserWrapper>
            {
              followingList.map((user, index) => (
                <InfoWrapper>
                  <FollowingImg src={user.profile_image}/>
                  <Wrapper>
                    <p>{user.nickname}</p>
                    <p>{user.email}</p>
                  </Wrapper>
                  <Button style={{height:"50%"}} onClick={()=>{undoFollowing(user.email)}}>팔로우 취소</Button>
                </InfoWrapper>
              ))
            }
            </UserWrapper>
        }
      </FollowingSection>
    </InfoBox>
  )
}


export default Following;