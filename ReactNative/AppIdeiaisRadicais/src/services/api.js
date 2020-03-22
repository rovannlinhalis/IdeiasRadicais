import axios from 'axios';

const api = axios.create({
    baseURL :'https://www.ideiasradicais.com.br',
});

export default api;