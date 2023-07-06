const nodeGeocoder = require('node-geocoder');

const options = {
    provider:"mapquest",
    httpAdapter: 'https',
    fomatter: null,
    apiKey:"glqQUUrzaeCl8GCchRyzQw6GXHOhCA1k",
}
const geocoder = nodeGeocoder(options);
module.exports = geocoder;