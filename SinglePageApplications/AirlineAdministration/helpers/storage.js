const storage = function () {
    //TODO: get appKey and appSecret from Kinvey
    const appKey = 'kid_BkfAE_RkV';
    const appSecret = '45be191c560749d1894408262c95a01f';
    const masterSecret = '37ccd4646651409c933a3aaabb746dbf';

    const saveData = function (key, value) {
        sessionStorage.setItem(appKey + key, JSON.stringify(value));
    };

    const getData = function (key) {
        return JSON.parse(sessionStorage.getItem(appKey + key));
    };

    const deleteData = function(key) {
        sessionStorage.removeItem(appKey + key);
    };

    const saveUser = function(data){
        saveData('userInfo', {
            id: data._id,
            username: data.username
        });

        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = function(){
        deleteData('authToken');
        deleteData('userInfo');
    };

    return {
        saveData,
        getData,
        deleteData,
        appKey,
        appSecret,
        saveUser,
        deleteUser,
        masterSecret
    };
}();