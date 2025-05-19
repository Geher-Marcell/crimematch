import axios from "axios";

const Axios = axios.create({
    baseURL: "https://api.fbi.gov/wanted/v1/list",
    headers: {
        "Content-Type" : "application/json"
    }
});

export default {
    getCriminals(page = 1){
        return Axios.get("/", {
            params: {
                page
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
