import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import Request from "../../functions/common/Request";
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import AdminButton from "../Admin/components/AdminButton";
import SearchBar from "../common/SearchBar";
import searchBlack from "../../assets/img/search_black.svg";
import StoryListModal from "./FormModals/StoryListModal";
import Pagination from '../common/Pagination';
import { Editor } from '@tinymce/tinymce-react';
import oc from "open-color";
import qs from "qs";
import { Modal, Button, ButtonToolbar, Placeholder} from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import AlertMessage from "../../functions/common/AlertMessage";

const InputTitle = styled.input`
width: 100%;
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 4px;
  line-height: 2.5rem;
  font-size: 1rem;
  // padding-left: 10px; 
  ::placeholder {
    padding: 4px;
    color: rgba(17, 17, 17, 0.48);
  }
  padding: 0.2em;
  box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08);

`;
const Section = styled.div`
  width: 75%;
  max-width: 600px;
  padding: 15px;
`

const StoryImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 3px;
  margin: 4px;
  margin-top: 0px;
`
const StorySection = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`
const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
  `;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  margin-top: 50px;
  margin: auto;
  align-items: center;

`;

const ValueBox = styled.div`
  // display: flex;
  width: 400px;
  margin-top: 30px;
`;

const View = styled.div`
`
const CountCharacters = styled.div`
  margin: 10px;
  justify-content: right;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  // justify-content: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  // justify-content: center;
`;
const Label = styled.div`
//   font-size: 1rem;
  font-weight: 700;
  font-size: 14px;
  color: black;
  margin-bottom: 0.75rem;
  margin-top: 0.75rem;
//   background-color: black;
`;
const SearchBarSection = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 6vh;
  width: 55%;
  display: flex;
  margin-top: 0.1%;
  margin:auto;
  flex-direction: row;
  grid-area: curation;
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
const ModalWrapper = styled.div`
  width: 50%;
  height: 70%;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 25%;
  background-color: rgba(255,255,255, 0.9);
  z-index: 5;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`
// const Modal = styled.div`
//   width: 50%;
//   height: 100%;
//   // text-align: center;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `
const DelX = styled.p`
  transition: all 0.5s;
  margin:0;
  padding: 0;
  cursor: pointer;
  &: hover {
    color:#E0EBFF;
  }
`
const StoryWrapper = styled.div`
  position: relative;
`

const charCount = (editor) => editor.getContent({ format: "text" }).length;

export default function CurationForm({id}) {
  const [imageUrl, setImageUrl] = useState(null);
  const sizeLimit = 200;
  const [count, setCount] = useState(0);
  const [item, setItem] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(4);
  const [form, setForm] = useState({
    title: '',
    contents: '',
  });
  const [search, setSearch] = useState('');
  const [searchToggle, setSearchToggle] = useState(false);
  const [selectedStory, setSelectedStory] = useState([]);
  const [rep_pic, setRep_pic] = useState([]);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("");
  const location = useLocation();
  const [pageOneFlag, setPageOneFlag] = useState(false);
  const request = Request(navigate);
  const ref = useRef();
  const myEmail = localStorage.getItem('email');
  const [message, setMessage] = useState(false);
  const [page, setPage] = useState(1);

  const uploadCuration = async () => {
    const formData = new FormData();
    for (let i of Object.keys(form)) {
      formData.append(i, form[i]);
    }
    
    for (let i of selectedStory) {
      formData.append(`stories`, i.story_id);
      formData.append('short_curations', '.');
      }
    
    id ? formData.append('photo_image_url', imageUrl) : formData.append('rep_pic', rep_pic);
    
    if (form.title.length == 0 || count == 0) {
      alert('빈 칸을 전부 채워주세요.')
      return;
    }
    if (!imageUrl) {
      alert('대표 사진을 설정해주세요.')
      return;
    }
    if (selectedStory.length < 3) {
      alert('최소 3개의 스토리를 선택해주세요.')
      return;
    }
    try {
      const response = id ?
                      await request.put(`/curations/curation_update/${id}/`, formData) :
                      await request.post('/curations/curation_create/', formData, { "Content-Type": "multipart/form-data" });
      const message = id ? "수정되었습니다." : "큐레이션이 생성되었습니다.";
      alert(message);
      navigate(`/curation/${response.data.data.id}`);
    }
    catch (e) {
      alert(`큐레이션 생성 실패 => ${e.response.data.detail}`);
    }
  }
    const onChangeImage = (e) => {
      const file = e.target.files[0];
      if (file != undefined) {
          const reader = new FileReader();
          reader.onload = () => {
              setImageUrl(reader.result);
          };
          reader.readAsDataURL(file);
          setRep_pic(file);
      }
  };

  const loadCuration = async() => {
    if (!id) return;
    try {
      const curationResponse = await request.get(`/curations/curation_detail/${id}/`);
      const { writer_email, contents, rep_pic, title } = curationResponse.data.data;
      const reponse_story_detail = await request.get(`/curations/curated_story_detail/${id}/`);
      setRep_pic(rep_pic);
      setImageUrl(rep_pic);
      setForm({title : title, contents : contents});
      setSelectedStory(reponse_story_detail.data.data);
      if (writer_email !== myEmail) navigate("/notexistpage", {state: {path: "/curation", message: "접근권한이 없습니다."}});
    }
    catch (e) {
      navigate("/notexistpage", {state : {path: "/curation"}});
    }
  }
  
  useEffect(() => {
    loadCuration();
  }, [])
  
  useEffect(() => {
    handleSearchToggle();
  }, [open, page]);

  useEffect(() =>{
    setPage(1);
  },[open, search]) // 검색할 때마다 페이지 번호 1로 수정

  const handleOpen = value => {
    setOpen(true);
    setSize(value);
  }
  const handleClose = () => {
    setOpen(false);
    setSearch("");
  }
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSearchToggle = async (e) => {
    if (e) {
      e.preventDefault();
    } //초기화 방지
    setSearchToggle(true);
    const response = await request.get("/stories/story_search/", {
      page:page,
      search: search,
    }, null);
    setItem(response.data.data.results);
    setPageCount(response.data.data.count);
  };

  useEffect(() => {
    const params = {
      page: page
    }
    if (search) params.search = search;
    if ((page === 1 && search) || (page !== 1)) {
      setSearchParams(params);
      setPageOneFlag(true);
    } else if (page === 1 && pageOneFlag) {
      setSearchParams(params);
    }
  }, [page, search])

  const handleInit = (value, editor) => {
    setForm({...form, contents: editor.getContent({format: "html"})});
    setCount(charCount(editor));
  };

  const handleUpdate = (value, editor) => {
    const cCount = charCount(editor);
    if (cCount <= sizeLimit) {
      setForm({...form, contents: editor.getContent({format: "html"})});
      setCount(cCount);
    }
  };

  const handleBeforeAddUndo = (evt, editor) => {
    // note that this is the opposite test as in handleUpdate
    // because we are determining when to deny adding an undo level
    if (charCount(editor) > sizeLimit) {
      evt.preventDefault();
    }
  };
  const handleSelectedStory = (id, rep_pic) => {
    if (selectedStory.filter(el => el.story_id === id).length > 0) {
      setSelectedStory(selectedStory.filter(el => el.story_id !== id));
      if (window.confirm("목록에서 삭제하시겠습니까?")) {
        alert("삭제되었습니다.");
        }
      }
  }

  return (
    <InfoBox>
      <ValueBox>
          <InputTitle placeholder='제목을 입력해주세요 *' defaultValue={form.title} placeholderTextColor={'#000000'} onChange={(e) => { setForm({ ...form, title: e.target.value });
        }} maxLength={45} />
          <CountCharacters>{form.title.length}/45</CountCharacters>
      </ValueBox>
      <Section>
        <Wrapper>
          <Label>
              대표사진
          </Label>
            {imageUrl ? <img
                src={imageUrl}
                alt="rep_pic"
                style ={{height:"400px",
                width:"400px"}}
            ></img> : <></>}
            <input
                type="file"
                id="ex_file"
                accept="image/*"
                onChange={onChangeImage}
            />
          <Label>스토리 선택</Label>
          <ButtonToolbar>
            <Button onClick={() => handleOpen('lg')}>스토리 선택</Button>
          </ButtonToolbar>

          <Modal open={open} size={size} backdrop={"static"}>
            <Modal.Header>
              <Modal.Title>스토리 선택</Modal.Title>
              {message && <AlertMessage setMessage={setMessage} text="📚 스토리 목록에 추가되었습니다."/>}
            </Modal.Header>
            <Modal.Body>
                <SearchBarSection>
                  <SearchBar style={{ width: '100%', backgroundColor: '#F1F1F1', alignItems: "center" }} placeholder="장소 검색" search={search} onChangeSearch={onChangeSearch} handleSearchToggle={handleSearchToggle} searchIcon={searchBlack}/>
                </SearchBarSection>
                <StoryListModal item = {item} selectedStory={selectedStory} setSelectedStory={setSelectedStory} setMessage={setMessage}/>
                <Pagination
                total={pageCount}
                limit={limit}
                page={page}
                setPage={setPage}
              />
              </Modal.Body>
              <Modal.Footer>
              <Button onClick={handleClose} appearance="primary">
                Ok
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>  
          </Modal>
        </Wrapper>
        <Label>선택된 스토리</Label>
        <StorySection>
          { 
            selectedStory.map((data, index) =>
              <ValueBox>
                <StoryWrapper>
                  <DelX onClick={() => {handleSelectedStory(data.story_id, data.rep_pic)}}>X</DelX>
                  <StoryImage
                  //  style={index == 0 && { borderColor: '#209DF5', borderWidth: 2 }}
                  src={ data.rep_pic } />
                  {index == 0 && <p style={{padding:"0px", margin:"0px"}}>대표</p>}
                </StoryWrapper>
              </ValueBox>
            )
          }
        </StorySection>
        <View>
          <Label>본문</Label>
          <Editor
            value={form.contents ? form.contents : ""}
            onInit={handleInit}
            onEditorChange={handleUpdate}
            onBeforeAddUndo={handleBeforeAddUndo}
            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
            init={{
                height: 500,
                menubar: true,
                placeholder: '본문을 작성해주세요',
                promotion: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
        />
        <p>{count}/{sizeLimit}</p>
        </View>
        <FooterSection>
          <AdminButton onClick={uploadCuration}><p>큐레이션 저장</p></AdminButton>
          <AdminButton onClick={()=>navigate('/curation')}><p>취소</p></AdminButton>
        </FooterSection>
      </Section>
    </InfoBox>
  )
}