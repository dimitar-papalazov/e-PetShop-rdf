import axios from "../custom-axios/axios";

const TypeService = {
    allTypes: () => {
        return axios.get("/api/products/types");
    }
}

export default TypeService;