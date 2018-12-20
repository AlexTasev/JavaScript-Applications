const userModel = (function () {
    let userUrl = `user/${storage.appKey}`;

    const login = function (username, password) {
        let authString = btoa(`${username}:${password}`);
        let headers = {
            Authorization: 'Basic ' + authString
        };

        let data = {username, password};
        let url = userUrl + '/login';

        return requester.post(url, data, headers);
    };

    const logout = function () {
        let url = userUrl + '/_logout';

        return requester.post(url);
    };

    const register = function (params) {
        let data = {
            username: params.username,
            password: params.password
        };

        let authString = btoa(`${storage.appKey}:${storage.appSecret}`);
        let headers = {Authorization: 'Basic ' + authString};

        return requester.post(userUrl, data, headers);
    };

    const isAuthorized = function () {
        return !!storage.getData('authToken');
    };

    return {
        login,
        logout,
        register,
        isAuthorized
    }
}());