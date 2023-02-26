import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;

// base URL: https://api.themoviedb.org/3/
// URL da api:  https://api.themoviedb.org/3/movie/550?api_key=c0a625d769d87639154042a89e28e7ca
