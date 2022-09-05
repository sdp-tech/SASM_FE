import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Pagination from "../../common/Pagination";
import ItemCard from "./ItemCard";
import nothingIcon from "../../../assets/img/nothing.svg";
const StoryList = ({ info }) => {
  return (
    <>
      <>
        <StorySection>
          <main>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "80vw",
              }}
              maxWidth="xl"
            >
              {info.length === 0 ? (
                <NothingSearched>
                  <img src={nothingIcon} style={{ marginBottom: "10px" }} />
                  해당하는 스토리가 없습니다
                </NothingSearched>
              ) : (
                <Grid container spacing={2}>
                  {info.map((info, index) => (
                    <Grid item key={info.id} xs={12} sm={12} md={12} lg={6}>
                      <CardSection>
                        <ItemCard
                          key={index}
                          id={info.id}
                          rep_pic={info.rep_pic}
                          title={info.title}
                          place_name={info.place_name}
                          category={info.category}
                          semi_category={info.semi_category}
                          preview={info.preview}
                          story_like={info.story_like}
                        />
                      </CardSection>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </main>
        </StorySection>
        {/* <FooterSection>
            <Pagination
              total={pageCount}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </FooterSection> */}
      </>
    </>
  );
};

const StorySection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // overflow: hidden;
  grid-area: story;
  // height: 100%;
  height: auto;
`;
const FooterSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
  grid-area: story;
  height: 12%;
`;
const CardSection = styled.div`
  box-sizing: border-box;
  position: relative;
  //   margin: 15px 0px 15px 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  grid-area: story;
  justify-content: center;
  align-items: center;
  // border: 1px solid green;
`;
const NothingSearched = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15%;
`;
export default StoryList;
