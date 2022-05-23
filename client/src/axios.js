import axios from "axios";

// const BASE_URL = "http://localhost:9000/api/"
const BASE_URL = "https://blog-app-mernstack2022.herokuapp.com/api/"

export const AxiosBaseUrl = axios.create({
 baseURL: BASE_URL,
});