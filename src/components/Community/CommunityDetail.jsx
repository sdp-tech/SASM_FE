import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import Request from '../../functions/common/Request';
import Loading from '../common/Loading'
import FreeBoardDetail from './Contents/FreeBoard/FreeBoardDetail';
import PlaceBoardDetail from './Contents/PlaceBoard/PlaceBoardDetail';
import PromotionBoardDetail from "./Contents/PromotionBoard/PromotionBoardDetail";
import GroupBoardDetail from './Contents/GroupBoard/GroupBoardDetail';

export default function CommunityDetail({id}) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});
  const [review, setReview] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate()
  const request = new Request(cookies, localStorage, navigate);
  const getDetail = async () => {
    setLoading(true);
    const response_detail = await request.get(`/community/posts/${id}`);
    const response_review = await request.get(`/community/post_comments/`, {
      post: id,
    })
    setReview(response_review.data.data.results);
    setDetail(response_detail.data);
    setLoading(false);
  }

  useEffect(()=>{
    getDetail()
  }, [])

  return (
    <>
      {
        loading?
          <Loading/>
          :
          <>
            {
              {
                "1":<FreeBoardDetail detail={detail} review={review}></FreeBoardDetail>,
                "2":<PlaceBoardDetail detail={detail} review={review}></PlaceBoardDetail>,
                "3":<PromotionBoardDetail detail={detail} review={review}></PromotionBoardDetail>,
                "4":<GroupBoardDetail detail={detail} review={review}></GroupBoardDetail>
              }[detail.board]
            }
          </>
      }
    </>
  )
}
