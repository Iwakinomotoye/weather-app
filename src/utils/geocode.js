const request = require('request');

function geocode(address, callback) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaXdha2lub21vdG95ZSIsImEiOiJja245enN6ZnIwcDdxMnZwZGNuN2RvMjJ1In0.LCr0xIvzB6MgyuBXCIuuPA&limit=1";

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            return callback("Unable to connect to location services");
        }

        if (body.message) {
            return callback(body.message);
        }

        if (body.features.length === 0) {
            return callback("Unable to find location. Try again with different search term");
        }
        
        const {center, place_name} = body.features[0];

        callback(undefined, {latitude: center[1], longitude: center[0], place: place_name});
        // console.log(features.place_name + " has a latitude of " + features.center[1] + " and a longitude of " + features.center[0]);
    })
}

module.exports = geocode;