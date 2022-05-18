// //
// //스토리 상세 페이지 전체
// //
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";

// import Navibar from "../common/Navibar";
// import StoryContent from "./StoryContent";

// // import Button from '@mui/material/Button';

// const Wrapper = styled.div`
//   /*박스*/
//   background: white;
//   width: 800px;
//   // height: 800px;
//   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); /* 그림자 */
//   margin: 0 auto; /* 페이지 중앙 정렬 */
//   margin-top: 4rem;
// `;

// const Image = styled.div`
//   width: 800px;
//   height: 200px;
//   font-size: 2.5rem;
//   text-align: center;
//   font-weight: 100;
//   background: #d3d3d3;
//   color: white;
//   margin: 0 auto; /* 페이지 중앙 정렬 */
// `;

// const MainTitleBox = styled.div`
//   // border: 1px solid RED;
//   width: 800px;
//   height: 50px;
//   font-size: 2.5rem;
//   font-weight: 900;
//   color: #000000;
//   margin: 0 auto; /* 페이지 중앙 정렬 */
//   display: flex;
// `;

// const MainTitle = styled.div`
//   // border: 1px solid RED;
//   width: 800px;
//   height: 50px;
//   font-size: 2.5rem;
//   font-weight: 700;
//   color: #000000;
//   display: flex;
// `;

// const SubTitle = styled.div`
//   padding-top: 1rem;
//   width: 800px;
//   height: 50px;
//   font-size: 1rem;
//   font-weight: 500;
//   color: #000000;
//   margin: 0 auto; /* 페이지 중앙 정렬 */
// `;

// const Content = styled.div`
//   padding-top: 1rem;
//   width: 800px;
//   font-size: 1rem;
//   font-weight: 500;
//   color: #000000;
//   margin: 0 auto; /* 페이지 중앙 정렬 */
// `;

// const ButtonDiv = styled.div`
//   // border: 1px solid RED;
//   height: 30px;
//   width: 300px;
//   display: flex;
//   justify-content: flex-end;
//   align-items: flex-end;
//   margin: 7px;
// `;

// // 기존에 존재하는 버튼에 재스타일
// const Button = styled.button`
//   background-color: #fcf16e;
//   padding: 0px 13px;
//   font-size: 1rem;
//   font-weight: 800;
//   color: #000000;
//   border-radius: 5px;
//   border-color: #fcf16e;
//   justify-content: flex-end;
// `;

// const MapButton = styled(Button)({
//   background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//   border: 0,
//   borderRadius: 3,
//   boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//   color: "#000000",
//   padding: "0 30px",
// });

// const StoryMain = () => {
//   const handlePageGoToMap = () => {
//     //추후 키값으로 찾고, 뒤에 붙여서 이동 예정
//     window.location.href = "/map";
//   };

//   //   const [state, setState] = useState({
//   //     loading: false,
//   //     ItemList: [] // 처음 Itemlist는 있는 상태로 기획 []
//   //   });

//   const loadItem = async () => {
//     // Json Data 불러오기
//     await axios // axios를 이용해
//       // json을 가져온다음
//       .get("./Data.json")

//       .then(({ data }) => {
//         console.log("data : ", data.Story);

//         const title = data.Story.map((data) => data.mainTitle);
//         console.log("title", title);

//         const storeName = data.Story.map((datas) => datas.subTitle);
//         console.log("storeName", storeName);

//         // const {MainTitle} =data
//         // // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
//         // // console.log
//         // console.log("data",MainTitle);
//         // setState({
//         //   loading: true, // load되었으니 true,
//         //   ItemList: data.Item // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
//         // });
//       })
//       .catch((e) => {
//         // json이 로드되지않은 시간엔
//         console.error(e); // 에러표시

//         // setState({
//         //   loading: false // 이때는 load 가 false 유지
//         // });
//       });
//   };

//   // 렌더링 관리
//   useEffect(() => {
//     loadItem();
//   }, []);
//   //   console.log(state);

//   return (
//     <>
//       <Navibar />
//       <Wrapper>
//         <StoryContent content={title} />
//       </Wrapper>
//     </>
//   );
// };

// export default StoryMain;
