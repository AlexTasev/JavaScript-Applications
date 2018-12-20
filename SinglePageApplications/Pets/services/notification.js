const notification = function () {
    const info = function (text) {
        $('#infoBox>span').text(text);
        $('#infoBox').show();
        $('#infoBox').fadeOut(3000);
    };

    const  error = function (text) {
        $('#errorBox>span').text(text);
        $('#errorBox').show();
        $('#errorBox').fadeOut(3000);
    };

    return {
        info,
        error
    };
}();