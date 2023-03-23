import React, { useEffect, useState } from 'react'
import WriteReview from './WriteReview';
import UserReview from './UserReview';
import styled from 'styled-components';
import Pagination from '../../common/Pagination';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Request from '../../../functions/common/Request';
import Loading from '../../common/Loading';

const ReviewBox = styled.div`
  height: auto;
  margin: 20px 0px;
  padding: 5px 10px;
  background: #E5E5E5;
  border-radius:10px;
  font-size: 1em;
`;
const StatisticWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`
const StatisticText = styled.p`
  line-height: 0.5;
  padding: 0px 10px;
`
const PercentageBar = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  position: absolute;
  top: 0%;
  background-color: #fff;
  z-index: -1;
`
export default function Reviews({ id, category, setValue }) {
  const [targetData, setTargetData] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const email = localStorage.getItem('email');
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);

  let keywordList = [
    ['분위기가 좋다', '1'],
    ['혼자 가기 좋다', '2'],
    ['함께 가기 좋다', '3'],
    ['가족끼리 가기 좋다', '4'],
    ['청결하다', '5'],
    ['뷰가 좋다', '6'],
    ['지속가능성의 필요성을 느낄 수가 있다', '7']
  ]
  switch (category) {
    case '식당 및 카페':
      keywordList.push(['음식이 맛있다', '8'], ['양이 많다', '9'], ['직원분이 친절하시다', '10'])
      break;
    case '전시 및 체험공간':
      keywordList.push(['전시가 멋지다', '11'], ['아이와 함께 가기 좋다', '12'], ['부모님과 함께 가기 좋다', '13'])
      break;
    case '도시 재생 및 친환경 건축물':
      keywordList.push(['특색 있다', '14'])
      break;
    case '제로웨이스트 샵':
      keywordList.push(['물건 종류가 다양하다', '15'])
      break;
    case '녹색 공간':
      keywordList.push(['관리가 잘 되어 있다', '16'])
      break;
  }
  const handleReviewOpen = () => {
    setReviewOpen(!reviewOpen);
  }
  const getReview = async () => {
    setLoading(true);
    const response_review = await request.get("/places/place_reviews/", { place_id: id, page: page});
    setReviewData(response_review.data.data);
    setLoading(false);
  }
  useEffect(() => {
    getReview();
  }, [page])
  return (
    <>
      {loading ?
        <Loading /> :
        <>
          {
            reviewData.statistics.map((data, index) => {
              return (
                <StatisticWrapper key={`${reviewData.id}_statistics_${index}`}>
                  <StatisticText>{data[0]}</StatisticText>
                  <PercentageBar width={data[1]} />
                  <StatisticText>{data[1]}%</StatisticText>
                </StatisticWrapper>
              );
            })
          }
          <ReviewBox>
            {reviewOpen ? <WriteReview setValue={setValue} keywordList={keywordList} id={id} targetData={targetData} /> : <div onClick={handleReviewOpen}>리뷰를 작성해보세요.</div>}
          </ReviewBox>
          {
            reviewData.results.map((data) => {
              const isWriter = (data.writer == email);
              return (
                <UserReview setValue={setValue} key={`review_${data.id}`} reviewData={data} setReviewOpen={setReviewOpen} writer={isWriter} setTargetData={setTargetData} />
              )
            })
          }
          <Pagination page={page} setPage={setPage} total={reviewData.count} limit={5} />
        </>}
    </>
  )
}
