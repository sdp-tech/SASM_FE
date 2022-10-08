import axios from "axios";

export default async function checkSasmAdmin(token, setLoading) {
    try {
        if (!token) {
            return false;
        }
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/users/me/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.is_sdp;
    } catch (err) {
        console.log("Error >>", err);
        return false;
    } finally {
        setLoading(false);
    }
}