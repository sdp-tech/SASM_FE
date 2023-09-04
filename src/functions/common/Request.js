import axios from "axios";

export default function Request (navigate) {


    const defaultRequest = async (path, body) => {
        const token = localStorage.getItem("accessTK"); //localStorage에서 accesstoken 꺼내기
        const url = process.env.REACT_APP_SASM_API_URL + path;

        let headerValue;

        if (token === null || token === undefined || token === false) {
            headerValue = `No Auth`;
        } else {
            headerValue = `Bearer ${token}`;
        }

        try {
            const response = await body(url, headerValue);
            return response;
        } catch (err) {
            if (err.response === undefined) {
                // 백엔드와 통신 자체가 실패(ERR_CONNECTION_REFUSED)
                console.log(err);
                alert("ERR_CONNECTION_REFUSED");
                throw err;
            }
            else if (
                err.response.status === 401
            ) {
                // access 토큰이 만료된 경우 또는 로그인이 필요한 기능의 경우
                //만료된 토큰 : "Given token not valid for any token type"
                //없는 토큰 : "자격 인증데이터(authentication credentials)가 제공되지 않았습니다."
                localStorage.removeItem("accessTK"); //기존 access token 삭제
                //refresh 토큰을 통해 access 토큰 재발급
                try {
                    const refreshtoken = localStorage.getItem("refreshTK"); // 로컬스토리지에서 refresh 토큰을 꺼내기
                    const response = await axios.post(
                        process.env.REACT_APP_SASM_API_URL + "/users/token/refresh/",
                        {
                            refresh: refreshtoken,
                        },
                        {
                            headers: {
                                Authorization: "No Auth",
                            },
                        }
                    );
                    localStorage.setItem("accessTK", response.data.access); //새로운 access token 따로 저장
                    headerValue = `Bearer ${response.data.access}`;
                } catch (err) {
                    // refresh 토큰이 유효하지 않은 모든 경우(토큰 만료, 토큰 없음 등)
                    alert("로그인이 필요합니다.");
                    navigate("/auth");
                    return;
                }
                // 새로운 access 토큰으로 API 요청 재수행
                const response = await body(url, headerValue);
                return response;

            } else {
                // 백엔드와 통신 자체는 성공, status code가 정상 값 범위 외
                console.log(err);
                throw err;

            }
        }
    }

    const get = async (path, params, headers) => {
        return await defaultRequest(path, async (url, headerValue) => {
            const response = await axios.get(
                url,
                {
                    params: params,

                    headers: {
                        Authorization: headerValue,
                        ...headers,
                    },
                }
            );
            console.log("request test => ", response);
            return response;
        });
    }

    const post = async (path, data, headers) => {
        return await defaultRequest(path, async (url, headerValue) => {
            const response = await axios.post(
                url,
                data,
                {
                    headers: {
                        Authorization: headerValue,
                        ...headers,
                    },
                }
            );
            console.log("headers", {
                Authorization: headerValue,
                ...headers,
            });
            console.log("request test => ", response);
            return response;
        });
    }

    const put = async (path, data, headers) => {
        return await defaultRequest(path, async (url, headerValue) => {
            const response = await axios.put(
                url,
                data,
                {
                    headers: {
                        Authorization: headerValue,
                        ...headers,
                    },
                }
            );
            console.log("request test => ", response);
            return response;
        });
    }

    const del = async (path, params, headers) => {
        return await defaultRequest(path, async (url, headerValue) => {
            const response = await axios.delete(
                url,
                {
                    params: params,

                    headers: {
                        Authorization: headerValue,
                        ...headers,
                    },
                }
            );
            console.log("request test => ", response);
            return response;
        });
    }

    const patch = async (path, data, headers) => {
        return await defaultRequest(path, async (url, headerValue) => {
            const response = await axios.patch(
                url,
                data,
                {
                    headers: {
                        Authorization: headerValue,
                        ...headers,
                    },
                }
            );
            console.log("request test => ", response);
            return response;
        });
    }
    return { get, post, put, del, patch };
}