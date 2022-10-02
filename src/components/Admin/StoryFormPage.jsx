import React, { useState, useEffect } from 'react';

import { useCookies } from "react-cookie";
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import Loading from "../common/Loading";

import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import oc from "open-color";
import AdminButton from "../Admin/components/AdminButton"

const StoryFormPage = (props) => {
    const id = props.id;
    const [story, setStory] = useState({ title: "", tag: "", preview: "", address: 0, story_review: "", html_content: "", rep_pic: "" });
    const [places, setPlaces] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["name"]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = cookies.name; // 쿠키에서 id 를 꺼내기

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('place_name', '굿바이마켓');
        formData.append('caption', '굿바이마켓');

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/sdp_admin/stories/photos/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    transformRequest: (data, headers) => {
                        return data;
                    },
                }
            );

            let location = response.data.data.location;
            return location;
        } catch (err) {
            console.log("Error >>", err);
        }
    };

    const loadStory = async () => {
        if (!id) {
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/sdp_admin/stories/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("data", response.data);
            const { title, tag, preview, address, story_review, html_content, rep_pic } = response.data
            setStory({
                ...story,
                title: title, tag: tag, preview: preview, address: address, story_review: story_review,
                html_content: html_content, rep_pic: rep_pic,
            });
            setLoading(false);
        } catch (err) {
            console.log("Error >>", err);
        }
    };


    const loadPlaces = async () => {
        //토큰 만료 or 없을 경우
        let headerValue;
        if (token === undefined) {
            headerValue = `No Auth`;
        } else {
            headerValue = `Bearer ${token}`;
        }
        setLoading(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/sdp_admin/places/`,
                {
                    headers: {
                        Authorization: headerValue,
                    },
                }
            );
            setPlaces(response);
            setLoading(false);
        } catch (err) {
            console.log("Error >>", err);
        }
    };

    useEffect(() => {
        setLoading(false);
        loadStory();
        // loadPlaces(); // place admin api 미구현
    }, []);

    const saveStory = async () => {
        const formData = new FormData();

        for (let [key, value] of Object.entries(story)) {
            formData.append(`${key}`, `${value}`);
        }

        // fordata 확인용!!
        // for (let key of formData.keys()) {
        //     console.log(key, "::", formData.get(key));
        // }

        try {
            if (!id) {
                const response = await axios.post(
                    "http://127.0.0.1:8000/sdp_admin/stories/",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                        transformRequest: (data, headers) => {
                            return data;
                        },
                    }
                );
                console.log(response)
            }
            else {
                const response = await axios.put(
                    `http://127.0.0.1:8000/sdp_admin/stories/${id}/`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                        transformRequest: (data, headers) => {
                            return data;
                        },
                    }
                );
                console.log(response)
            }
            navigate("/story");
        } catch (err) {
            console.log("Error >>", err.response.data);
            alert("스토리 생성 실패", err.response.data);
        }
    };

    const onChangeImage = async (e) => {
        const file = e.target.files[0];
        if (file != undefined) {
            const location = await uploadImage(file);

            setStory({
                ...story,
                rep_pic: location,
            });
        }
    };


    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Section>
                        <InputWithLabel
                            value={story.title}
                            onChange={(event) => {
                                setStory({
                                    ...story,
                                    title: event.target.value,
                                });
                            }}
                            label="제목"
                        />
                        <InputWithLabel
                            value={story.address}
                            onChange={(event) => {
                                setStory({
                                    ...story,
                                    address: event.target.value,
                                });
                            }}
                            label="장소"
                        />
                        <InputWithLabel
                            value={story.story_review}
                            onChange={(event) => {
                                setStory({
                                    ...story,
                                    story_review: event.target.value,
                                });
                            }}
                            label="한줄평"
                        />
                        <InputWithLabel
                            value={story.tag}
                            onChange={(event) => {
                                setStory({
                                    ...story,
                                    tag: event.target.value,
                                });
                            }}
                            label="태그"
                        />
                        <InputWithLabel
                            value={story.preview}
                            onChange={(event) => {
                                setStory({
                                    ...story,
                                    preview: event.target.value,
                                });
                            }}
                            label="프리뷰"
                        />
                        <label>
                            대표사진:
                            {story.rep_pic ? <img
                                src={story.rep_pic}
                                alt="rep_pic"
                                height="400px"
                                width="400px"
                            ></img> : <></>}
                            <input
                                type="file"
                                id="ex_file"
                                accept="image/*"
                                onChange={onChangeImage}
                            />
                        </label>
                        <Wrapper>
                            <Label>본문</Label>
                            <Editor
                                value={story.html_content}
                                onInit={(event, editor) => {
                                    setStory({
                                        ...story,
                                        html_content: editor.getContent({ format: 'html' }),
                                    });
                                }}
                                onEditorChange={(html_content, editor) => {
                                    setStory({
                                        ...story,
                                        html_content: editor.getContent({ format: 'html' }),
                                    });
                                }}
                                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    promotion: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    images_upload_handler: async (blobInfo) => {
                                        return new Promise((resolve, reject) => {
                                            uploadImage(blobInfo.blob(),
                                            ).then(location => {
                                                console.log(location)
                                                resolve(location);
                                            }).catch(error => {
                                                reject('HTTP Error: ' + error.message);
                                            });
                                        })
                                    },
                                }}
                            />
                        </Wrapper>
                        <FooterSection>
                            <AdminButton onClick={saveStory}>스토리 저장</AdminButton>
                        </FooterSection>
                    </Section>
                </>
            )
            }
        </>
    );
}
const Section = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 50%;
  grid-area: story;
  display: flex;
  flex-direction: column;
  margin: auto;
  // border: 1px solid red;
//   background-color: black;
`;
const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
  // background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  flex-grow: 3;
`;
const Label = styled.div`
//   font-size: 1rem;
  font-weight: 700;
  font-size: 14px;
  color: black;
  margin-bottom: 0.25rem;
//   background-color: black;
`;
const Input = styled.input`
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
const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  // overflow: hidden;
  // grid-area: story;
  height: 100%;
  justify-content: center;
  align-items: center;
  // background: black;
  `;
const InputWithLabel = ({ label, message, ...rest }) => (
    <Wrapper>
        <Label>{label}</Label>
        <Input {...rest} />
    </Wrapper>
);
export default StoryFormPage;

/*

    'cleanup_on_startup': True,
    'custom_undo_redo_levels': 20,
    'selector': 'textarea',
    'theme': 'silver',
    'plugins': '''
            textcolor save link image media preview codesample contextmenu
            table code lists fullscreen  insertdatetime  nonbreaking
            contextmenu directionality searchreplace wordcount visualblocks
            visualchars code fullscreen autolink lists  charmap print  hr
            anchor pagebreak
            ''',
    'toolbar1': '''
            fullscreen preview bold italic underline | fontselect,
            fontsizeselect  | forecolor backcolor | alignleft alignright |
            aligncenter alignjustify | indent outdent | bullist numlist table |
            | link image media | codesample |
            ''',
    'toolbar2': '''
            visualblocks visualchars |
            charmap hr pagebreak nonbreaking anchor |  code |
            ''',
    'toolbar3': '''
            h1 h2 h3 pre code
            ''',
    'contextmenu': 'formats | link image',
    'menubar': True,
    'statusbar': True,
    'promotion': False,
    'images_upload_url': '/board/upload_image/',
    'images_upload_credentials': True


    function StoryFormPage() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 500,
                    menubar: true,
                    skin: false,
                    content_css: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}

*/