export const CATEGORY_LIST = [
    { id: 0, data: "식당 및 카페", name: "식당·카페" },
    { id: 1, data: "전시 및 체험공간", name: "전시·체험" },
    { id: 2, data: "제로웨이스트 샵", name: "제로웨이스트" },
    { id: 3, data: "도시 재생 및 친환경 건축물", name: "건축물" },
    { id: 4, data: "복합 문화 공간", name: "복합문화" },
    { id: 5, data: "녹색 공간", name: "녹색공간" },
];

export function MatchCategory (data) {
    for(let i=0; i<6; i++) {
        if(CATEGORY_LIST[i].data==data) {
            return i;
        }
    }
}