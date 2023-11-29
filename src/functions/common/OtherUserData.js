import react, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Request from "./Request";
import styled from "styled-components";
import { Button, Modal } from "rsuite";

export default function OtherUserData (props) {
  const navigate = useNavigate();
  const request = Request(navigate);
  const token = localStorage.getItem('accessTK');
  const [otherReview, setOtherReview] = useState([]);
  const [otherStory, setOtherStory] = useState([]);
  const [otherCuration, setOtherCuration] = useState([]);
  const myEmail = localStorage.getItem('email');


  const following = async (email) => {
    const response = await request.post('/mypage/follow/',
      {
        targetEmail: email
      })

    if(response.data.status == 'fail') alert(response.data.message)
    props.rerender();
  }

  const getOtherUserReview = async() => {
    if(token) {
    let params = new URLSearchParams();
    params.append('email', props.userData.email);
    const response = await request.get(`/mypage/other_reviewed_place/?${params.toString()}`);
    setOtherReview(response.data.data.results);
    }
  }

  const getOtherUserStory = async() => {
    if (token) {
      const response = await request.get('/mypage/user/other_story/', {
        email: props.userData.email
      })
      setOtherStory(response.data);
    }
  }

  const getOtherUserCuration = async() => {
    if (token) { 
    const response = await request.get('/mypage/user/other_curation/', {
      email: props.userData.email
    })
    setOtherCuration(response.data.data);
    }
  }

  useEffect(() => {
    getOtherUserReview();
    getOtherUserStory();
    getOtherUserCuration();
  }, [props.open]);

  return (
      <Modal open={props.open} size={"md"} backdrop={"static"}>
        <Modal.Header>
          <Modal.Title>프로필 조회</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileWrapper>
            <ProfileImg src={props.userData.profile_image}/>
            <TextWrapper>
              <ProfileText>닉네임 : {props.userData.nickname}</ProfileText>
              <ProfileText>이메일 : {props.userData.email}</ProfileText>
              <ProfileText>한 줄 소개: {props.userData.introduction ? props.userData.introduction : "안녕하세요."}</ProfileText>
            </TextWrapper>
            {
              myEmail !== props.userData.email ? <Button style={{position: 'absolute', right:'20px'}}onClick={()=>{following(props.userData.email)}}>{props.userData.is_followed ? 
              <p>팔로우 취소</p>:
              <p>+ 팔로잉</p>}</Button> : <></>
            }
            {console.log(props)}
          </ProfileWrapper>
          <ButtonWrapper>
            <SelectButton>{props.userData.nickname}의 스토리
              <LinkList>
                <OtherUserWriting>
                  {otherStory.map((data) => (
                    <List>
                      <ListText onClick={()=>{window.open(`/story/${data.id}`)}}>{data.title}</ListText>
                    </List>
                  ))}
                </OtherUserWriting> 
              </LinkList>
            </SelectButton>
            <SelectButton>{props.userData.nickname}의 큐레이션
            <LinkList>
                <OtherUserWriting>
                  {otherCuration.map((data) => (
                    <List>
                      <ListText onClick={() => {window.open(`/curation/${data.id}`)}}>{data.title}</ListText>
                    </List>
                  ))}
                </OtherUserWriting>
              </LinkList>
            </SelectButton> 
          </ButtonWrapper>
          <ButtonWrapper>
          <SelectButton>{props.userData.nickname}의 장소에 관한 댓글
            <LinkList>
                <OtherUserWriting>
                  {otherReview.map((data) => (
                    <List>
                      <ListText onClick={() => {
                        window.open(`/map?page=1&place=${data.place_name}`)
                        localStorage.setItem("place_name", data.place_name);
                        localStorage.setItem("value", 1);
                        }}>{data.place_name}</ListText>
                    </List>
                  ))}
                </OtherUserWriting>
              </LinkList>
            </SelectButton>
          </ButtonWrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={props.handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

const ProfileWrapper = styled.div`
  display: flex;
  height: 100%;
  position: relative;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileText = styled.p`
  font-size: 1rem;
  font-weight: 500;
`

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 2vw;
  border-radius: 50%;
`

const OtherUserWriting = styled.div`
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
`

const SelectButton = styled.div`
  width: 49%;
  font-size: 18px;
  margin-right: 1%;
`

const LinkList = styled.div`
  
`

const List = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
`

const ListText = styled.p`
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
 &:hover {
  color: #289AFF;
 }
`