export default function PageRedirection(navigate, title, pathName) {
  const nickname = localStorage.getItem('nickname');
  const urlHash = {
    SASM: "",
    MAP: "map?page=1",
    STORY: "story?page=1",
    "MY PAGE": `mypage`,
    "MY PICK": `mypick/myplace?page=1&me=${nickname}`,
    "LOG IN": "auth",
    CURATION: "curation",
    COMMUNITY: "community/1?page=1",
    JOIN: "auth/register",
  };

  pathName ==="/" ? window.open(("/" + urlHash[title])) : navigate("/" + urlHash[title]);
}
