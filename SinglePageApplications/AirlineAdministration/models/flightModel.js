const flightModel = function () {

    let flightUrl = `appdata/${storage.appKey}/flights`;

    const add = function (params) {
        let data = {
            "destination": params.destination,
            "origin": params.origin,
            "departure": params.departureDate,
            "departureTime": params.departureTime,
            "seats": params.seats,
            "cost": params.cost,
            "image": params.img,
            "isPublic": !!params.public
        };

        return requester.post(flightUrl, data)
    };

    const flights = function (onlyPublic) {
        let url = flightUrl;
        if (onlyPublic) {
            url += '?query={"isPublic":true}';
        }

        return requester.get(url)
    };

    const getFlight = function (flightId) {
        let detailsUrl = `${flightUrl}/${flightId}`;

        return requester.get(detailsUrl)
    };
    
    const edit = function (params) {
        let url = flightUrl + `/${params.flightId}`;
        let data = {
            "destination": params.destination,
            "origin": params.origin,
            "departure": params.departureDate,
            "departureTime": params.departureTime,
            "seats": params.seats,
            "cost": params.cost,
            "image": params.img,
            "isPublic": !!params.public
        };
        return requester.put(url, data);
    };

    const remove = function (flightId) {
        let url = flightUrl + '/' + flightId;
        return requester.del(url)
    };
    
    const myFlights = function (userId) {
        let url = flightUrl + `?query={"_acl.creator":"${userId}"}`;
        return requester.get(url);
    };

    return {
        add,
        flights,
        getFlight,
        edit,
        remove,
        myFlights
    };
}();