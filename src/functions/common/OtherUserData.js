import react from "react"
import styled from "styled-components"
import { Button, Modal } from "rsuite"

export default function OtherUserData (props) {

  return (
      <Modal open={props.open} size={"sm"} backdrop={"static"}>
        <Modal.Header>
          <Modal.Title>프로필 조회</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileWrapper>
            <ProfileImg src={props.userData.profile_image}/>
            <TextWrapper>
              <ProfileText>닉네임 : {props.userData.nickname}</ProfileText>
              <ProfileText>이메일 : {props.userData.email}</ProfileText>
              <ProfileText>한 줄 소개: {props.introduction ? props.introduction : "안녕하세요."}</ProfileText>
            </TextWrapper>
          </ProfileWrapper>
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
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileText = styled.p`
  font-size: 1rem;
`

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 2vw;
  border-radius: 50%;
`