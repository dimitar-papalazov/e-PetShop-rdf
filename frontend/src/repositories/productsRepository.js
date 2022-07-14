import axios from "../custom-axios/axios";

const ProductService = {
    allProducts: () => {
        return axios.get("/api/products");
    },
    bestProducts: () => {
        return axios.get("/api/products/most-selling");
    },
    details: (id) => {
        return axios.get("/api/products/details?id="+id);
    },
    similar: (id) => {
        return axios.get("/api/products/similar?id="+id);
    },
    add: (product) => {
        return axios.post("/api/products/add", product);
    },
    edit: (id, product) => {
        return axios.put("/api/products/edit?id=" + id, product);
    },
    delete: (id) => {
        return axios.post("/api/products/delete?id=" + id);
    }
}

export default ProductService;