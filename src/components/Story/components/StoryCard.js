import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
const StoryCard = (props) => {
  return (
    <Card
      sx={{
        minHeight: "300px",
        minWidth: "600px",
        maxHeight: "300px",
        maxWidth: "600px",
        backgroundColor: "yellow",
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
        // p: 1,
        // m: 1,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          16: 9,
          minHeight: "300px",
          minWidth: "300px",
          maxHeight: "300px",
          maxWidth: "300px",
          //   pt: "56.25%",
          display: "flex",
          //   flexDirection: "column",
        }}
        image="https://source.unsplash.com/random"
        alt="random"
      />

      <CardContent
        sx={{
          // flexGrow: 1,
          minHeight: "300px",
          minWidth: "300px",
          maxHeight: "300px",
          maxWidth: "300px",
          display: "flex",
          flexFlow: "column",
          // flexFlow: "row nowrap",
          // justifyContent: "flex-end",
          // alignItems: "center" /* 하위 요소들 수직 가운데정렬 */,
          position: "relative",
        }}
      >
        {/* 제목, 식당이름, 장소 카테고리, 장소 옵션들, 미리보기(preivew) */}
        <Typography gutterBottom variant="h5" component="h2">
          {props.mainTitle}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {props.storeName}
        </Typography>
        <Typography>장소 카테고리</Typography>
        <Typography>장소 옵션들</Typography>
        <br />
        <br />
        <Typography>{props.content}</Typography>
      </CardContent>
      <CardActions>
        {/* <Button
                      onClick={() => {
                        // 서버에서 쿼리처리!!
                        navigate("/detail");
                      }}
                      size="small"
                    >
                      View
                    </Button> */}
        {/* <Button size="small"> */}
        {/* <FavoriteBorderRoundedIcon sx={{ mr: 2 }} /> */}
        {/* </Button> */}
      </CardActions>
    </Card>
  );
};

export default StoryCard;
