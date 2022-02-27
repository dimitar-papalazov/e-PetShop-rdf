import axios from "../custom-axios/axios";

const TypeService = {
    allTypes: () => {
        return axios.get("/api/products/types");
    },
    productsByType: (type) => {
        return axios.get("/api/products/by-type", type);
    }
}

export default TypeService;