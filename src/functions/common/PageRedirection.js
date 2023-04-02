export default function PageRedirection(navigate, title) {
  const urlHash = {
    SASM: "",
    MAP: "map?page=1",
    STORY: "story?page=1",
    "MY PAGE": "mypage",
    "MY PICK": "mypick/myplace?page=1",
    "LOG IN": "auth",
    COMMUNITY: "community/1?page=1",
    JOIN: "auth/register",
  };

  navigate("/" + urlHash[title]);
}
