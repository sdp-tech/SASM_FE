import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import ItemCard from "./ItemCard";
import nothingIcon from "../../../assets/img/nothing.svg";
const CurationList = ({ info }) => {
  const navigate = useNavigate();
  return (
    <>
      <>
        <CurationSection>
          <main style={{width: '100%'}}>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                minWidth: '75vw',
              }}
            >
              {info.length === 0 ? (
                <NothingSearched>
                  <img src={nothingIcon} style={{ marginBottom: "10px", margin: 'auto' }} />
                  해당하는 큐레이션이 없습니다
                </NothingSearched>
              ) : (
                <Grid container spacing={2}>
                  {info.map((info, index) => (
                    <Grid item key={info.id} xs={3} sm={3} md={3} lg={3}>
                      <CardSection onClick={ () => { navigate(`/curation/${info.id}`)}}>
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
        </CurationSection>
      </>
    </>
  );
};

const CurationSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;
const CardSection = styled.div`
  box-sizing: border-box;
  position: relative;
    // margin: 15px 0px 15px 15px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;
const NothingSearched = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
export default CurationList;
