import axios from "../custom-axios/axios";

const MemberService = {
    registration: (username,email,password,repeat,firstName,lastName) => {
        return axios.post("/api/members/registration", {
            username,
            email,
            password,
            firstName,
            lastName,
            role: 1
        });
    },
    login: (username, passwod) => {
        return axios.get("/api/members/login?username="+username + "&password="+passwod);
    }
};

export default MemberService;