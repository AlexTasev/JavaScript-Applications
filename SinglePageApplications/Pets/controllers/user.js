const user = (function () {
    //TODO Check validation criteria
    const userPattern = /^[A-Za-z0-9]{3,}$/;
    const passPattern = /^[A-Za-z0-9]{6,}$/;

    const getLogin = function (ctx) {
        ctx.partial('views/user/login.hbs');
    };

    const postLogin = function (ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;

        if (!userPattern.test(username)) {
            notification.error('Username must be at least 3 symbols');
        } else if (!passPattern.test(password)) {
            notification.error('Password must be at least 6 symbols');
        }else {
            userModel.login(username, password)
                .done(function (data) {
                    storage.saveUser(data);
                    notification.info('Login successful.');
                    ctx.redirect('#/');
                }).fail(function () {
                notification.error('Invalid username or password!')
            });
        }
    };

    const logout = function (ctx) {
        userModel.logout().done(function () {
            storage.deleteUser();
            notification.info('Logout successful');

            ctx.redirect('#/');
        });
    };

    const getRegister = function (ctx) {
        ctx.partial('views/user/register.hbs');
    };

    const postRegister = function (ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;

        if (!userPattern.test(username)) {
            notification.error('Username must be at least 3 symbols');
        } else if (!passPattern.test(password)) {
            notification.error('Password must be at least 6 symbols');
        } else {
            userModel.register(ctx.params).done(function (data) {
                storage.saveUser(data);
                notification.info('User registration successful.');

                ctx.redirect('#/');
            });
        }
    };

    //TODO: Hide and show buttons when the user is logged-in
    const initializeLogin = function () {
        let userInfo = storage.getData('userInfo');
        if (userModel.isAuthorized()) {
            $('.navbar-anonymous').hide();
            $('.first-bar').show();
            $('.second-bar').show();
            $('#userNameView').text(`${userInfo.username}`)
        } else {
            $('.first-bar').hide();
            $('.second-bar').hide();
            $('.navbar-anonymous').show();
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