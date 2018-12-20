const user = (function () {
    const getLogin = function (ctx) {
        ctx.partial('views/user/login.hbs');
    };

    const postLogin = function (ctx) {
        let username = ctx.params.username;
        let password = ctx.params.pass;

        userModel.login(username, password).done(function (data) {
            storage.saveUser(data);
            notification.info('Login successful!');

            ctx.redirect('#/');
        }).fail(function () {
            notification.error('Invalid username or password!')
        })
    };

    const logout = function (ctx) {
        userModel.logout().done(function () {
            storage.deleteUser();
            notification.info('Logout successful');

            ctx.redirect('#/login');
        });
    };

    const getRegister = function (ctx) {
        ctx.partial('views/user/register.hbs');
    };

    const postRegister = function (ctx) {
        userModel.register(ctx.params).done(function (data) {
            storage.saveUser(data);
            notification.info('User registration is successful!');

            ctx.redirect('#/');
        });
    };

    //TODO: Hide and show buttons when the user is logged-in
    const initializeLogin = function () {
        let userInfo = storage.getData('userInfo');
        if (userModel.isAuthorized()) {
            $('#userNameSpanView').text(userInfo.username);
            $('#logoutContainer').removeClass('d-none');
            $('.hidden-when-logged').addClass('d-none');
        } else {
            $('#logoutContainer').addClass('d-none');
            $('.hidden-when-logged').removeClass('d-none');
        }
    };

    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister,
        initializeLogin
    };
}());