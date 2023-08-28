import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Request from "../../functions/common/Request";
import {useCookies} from "react-cookie"
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import AdminButton from "../Admin/components/AdminButton";
import SearchBar from "../common/SearchBar";
import searchBlack from "../../assets/img/search_black.svg";
import StoryListModal from "./FormModals/StoryListModal";
import Pagination from '../common/Pagination';
import { Editor } from '@tinymce/tinymce-react';
import oc from "open-color";
import qs from "qs";

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
  height: 7vh;
  width: 65%;
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
const ModalButton = styled.button`
`
const charCount = (editor) => editor.getContent({ format: "text" }).length;

export default function CurationForm() {
  const [imageUrl, setImageUrl] = useState(null);
  const sizeLimit = 200;
  const [data, setData] = useState("");
  const [count, setCount] = useState(0);
  const [item, setItem] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [limit, setLimit] = useState(4);
  const [form, setForm] = useState({
    title: '',
    contents: '',
  });
  const [search, setSearch] = useState('');
  const [searchToggle, setSearchToggle] = useState(false);
  const [selectedStory, setSelectedStory] = useState([]);
  const [rep_pic, setRep_pic] = useState([])
  const [curation, setCuration] = useState({title: '', contents: '', uri:'', width: 1, height: 1, fileName: ''})
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("");
  const [backdrop, setBackdrop] = useState('static');
  const location = useLocation();
  const queryString = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  // const token = cookies.name; // 쿠키에서 id 를 꺼내기
  const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken꺼내기
  const request = new Request(cookies, localStorage, navigate);

  const uploadCuration = async () => {
    const formData = new FormData();
    for (let i of Object.keys(form)) {
      formData.append(i, form[i]);
    }

    formData.append('rep_pic', rep_pic)
    for (let i of selectedStory) {
      formData.append('stories', i.id);
      formData.append('short_curations', '.');
    }
    if (form.title.length == 0 || count == 0) {
      alert('빈 칸을 전부 채워주세요.')
      return;
    }
    if (imageUrl == '') {
      alert('대표 사진을 설정해주세요.')
      return;
    }
    if (selectedStory.length < 3) {
      alert('최소 3개의 스토리를 선택해주세요.')
      return;
    }
    const response = await request.post('/curations/curation_create/', formData, { "Content-Type": "multipart/form-data" });
    console.log(response, 'siuuu');
    navigate("/curation");
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
  
  useEffect(() =>{
    queryString.page = 1;
  },[open, search]) // 검색할 때마다 페이지 번호 1로 수정

  useEffect(() => {
    handleSearchToggle();
  }, [open, queryString.page]);

  const handleOpen = value => {
    setOpen(true);
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
    setLoading(true);
    let newPage;
    if (queryString.page == 1) {
      newPage = null;
    } else {
      newPage = queryString.page;
    }
   
    let searched;
    if (search === null || search === "") {
      //검색어 없을 경우 전체 리스트 반환
      searched = null;
    } else {
      //검색어 있는 경우
      searched = search;
    }

    const response = await request.get("/stories/story_search/", {
      page:newPage,
      search: searched,
    }, null);
    search.length !== 0 ? setSearchParams({page:queryString.page, search: search}) : setSearchParams({page:queryString.page}); 
    setItem(response.data.data.results);
    setPageCount(response.data.data.count);
    console.log(response.data.data);
    setLoading(false);
  };

  const handleInit = (value, editor) => {
    setCount(charCount(editor));
    setForm({...form, contents: editor.getContent({format: "text"})});
  };

  const handleUpdate = (value, editor) => {
    const cCount = charCount(editor);
    if (cCount <= sizeLimit) {
      setData(value);
      setCount(cCount);
    }
    setForm({...form, contents: editor.getContent({format: "text"})})
  };

  const handleBeforeAddUndo = (evt, editor) => {
    // note that this is the opposite test as in handleUpdate
    // because we are determining when to deny adding an undo level
    if (charCount(editor) > sizeLimit) {
      evt.preventDefault();
    }
  };

  return (
    <InfoBox>
      <ValueBox>
          <InputTitle placeholder='제목을 입력해주세요 *' placeholderTextColor={'#000000'} onChange={(e) => { setForm({ ...form, title: e.target.value });
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
            ></img> : <>
                {curation.rep_pic ?
                    <img src={curation.rep_pic}
                        alt="rep_pic"
                        style ={{height:"400px",
                        width:"400px"}}></img>
                    : <></>}
            </>}
            <input
                type="file"
                id="ex_file"
                accept="image/*"
                onChange={onChangeImage}
            />
          <Label>스토리 선택</Label>
          <AdminButton onClick={handleOpen}>스토리 선택</AdminButton>
          { open ?<Wrapper>      
              <SearchBarSection>
                <SearchBar style={{ width: '100%', backgroundColor: '#F1F1F1', alignItems: "center" }} placeholder="장소 검색" search={search} onChangeSearch={onChangeSearch} handleSearchToggle={handleSearchToggle} searchIcon={searchBlack}/>
              </SearchBarSection>
              <StoryListModal item = {item} selectedStory={selectedStory} setSelectedStory={setSelectedStory}/>
              <Pagination
              total={pageCount}
              limit={limit}
              page={queryString.page}
            /><ButtonWrapper>
                <AdminButton onClick={handleClose}>
                  확인
                 </AdminButton>
                <AdminButton onClick={handleClose}>
                  취소
                </AdminButton>
              </ButtonWrapper>
              </Wrapper>:<></>}
        </Wrapper>
        <Label>선택된 스토리</Label>
        <StorySection>
          {
            selectedStory.map((data, index) =>
              <ValueBox>
                <StoryImage
                //  style={index == 0 && { borderColor: '#209DF5', borderWidth: 2 }}
                 src={ data.rep_pic } />
                {index == 0 && <p>대표</p>}
              </ValueBox>
            )
          }
        </StorySection>
        <View>
          <Label>본문</Label>
          <Editor
            value={data}
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