import Request from "../../functions/common/Request";

export default async function checkSasmAdmin(token, setLoading, navigate) {
    try {
        if (token == null || undefined) {
            return false;
        }
        const request = Request(navigate);
        setLoading(true);
        const response = await request.get("/mypage/me/", null, null);
        return response.data.data.is_sdp_admin;
    } catch (err) {
        console.log("Error >>", err);
        return false;
    } finally {
        setLoading(false);
    }
}
