import axios from 'axios';

const api = 'https://lb7u7svcm5.execute-api.ap-southeast-1.amazonaws.com/dev/';

export default axios.create({
    baseURL: api,
})