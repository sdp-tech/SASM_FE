export default function PageRedirection(navigate, title) {
  const urlHash = {
    SASM: "",
    MAP: "map",
    STORY: "story",
    "MY PAGE": "mypage",
    "MY PICK": "mypick",
    "LOG IN": "auth",
    COMMUNITY: "community/1",
    JOIN: "auth/register",
  };

  navigate("/" + urlHash[title]);
}
