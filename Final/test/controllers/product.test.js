const axios = require('axios');

test('[GET] api/productos/', async() => {
    const nonExistentProductUrl = 'http://localhost:8080/api/productos/fruta';
    const response = await axiosGet(nonExistentProductUrl);
    expect(response.status).toBe(400)
    expect(response.data).toHaveProperty('error', 'Producto no encontrado')
});

test('[GET] api/productos/', async() => {
    const nonExistentProductUrl = 'http://localhost:8080/api/productos/fruta2';
    const response = await axiosGet(nonExistentProductUrl);
    expect(response.status).toBe(400)
    expect(response.data).toHaveProperty('error', 'Producto no encontrado')
});

const axiosGet = async (url) => {
    let response;
    try {
        response = await axios.get(url);
    } catch (err) {
        response = err.response
    }
    return response;
};

const axiosPut = async (url, object) => {
    let response;
    try {
        response = await axios.put(url, object);
    } catch (err) {
        response = err.response
    }
    return response;
};