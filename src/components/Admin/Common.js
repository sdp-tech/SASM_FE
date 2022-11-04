import axios from "axios";
import Request from "../../functions/common/Request";

export default async function checkSasmAdmin(token, setLoading, cookies, localStorage, navigate) {
    try {
        const request = new Request(cookies, localStorage, navigate);
        setLoading(true);
        const response = await request.get("/users/me/", null, null);
        return response.data.data.is_sdp;
    } catch (err) {
        console.log("Error >>", err);
        return false;
    } finally {
        setLoading(false);
    }
}
