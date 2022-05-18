import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from "styled-components";

import Navibar from "../components/common/Navibar";

import { useNavigate } from "react-router";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        SASM
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const theme = createTheme();

export default function Story() {
  const viewPage = () => {
    window.location.href = "/detail"; //replace는 뒤로가기 불가능, href는 가능
  };
  const navigate = useNavigate();

  // console.log(window.history);
  return (
    <Sections>
      <Navibar/>
      <StorySection>
        <ThemeProvider theme={theme}>

        <main>

          <Container sx={{ py: 8 }} maxWidth="lg"> 
        
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={
                        {
                          // 16:9
                          // pt: '56.25%',
                        }
                      }
                      image="https://source.unsplash.com/random"
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        제목
                      </Typography>
                      <Typography>내용</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => {
                          // 서버에서 쿼리처리!!
                          navigate("/detail");
                        }}
                        size="small"
                      >
                        View
                      </Button>
                      <Button size="small">
                        {" "}
                        <FavoriteBorderRoundedIcon sx={{ mr: 2 }} />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Sasm
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
        </ThemeProvider>
      </StorySection>
    </Sections>
  );
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.1fr 0.9fr;
  grid-template-areas: 
    "navibar"
    "story"
  ;
`;

const StorySection = styled.div`
  position: relative;
  background-color: yellow;
  grid-area: story;
`