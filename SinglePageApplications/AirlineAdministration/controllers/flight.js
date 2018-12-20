const flight = function () {
    // TODO CREATE -> Load the correct view to create user
    const addGet = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');
        } else {
            ctx.partial('views/flight/add.hbs')
        }
    };
    const addPost = function (ctx) {
        flightModel.add(ctx.params)
            .done(function () {
                notification.info('Flight added successfully!');
                ctx.redirect('#/');
            }).fail(function () {
            notification.error('Flight was not added!')
        })
    };

    //TODO READ -> Check the details section and the view
    const details = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');
        } else {
            let flight = flightModel.getFlight(ctx.params.flightId)
                .done(function (flight) {
                    if (!flight) {
                        ctx.redirect('#/');
                        return;
                    }
                    if (flight._acl.creator !== storage.getData('userInfo').id) {
                        flight.display = 'none';
                    } else {
                        flight.display = 'inline-block';
                    }
                    ctx.flight = flight;
                    ctx.partial('views/flight/details.hbs');
                });
        }
    };

    //  TODO UPDATE -> Check the edit view, model and controller
    const editGet = function (ctx) {
        let flight = flightModel.getFlight(ctx.params.flightId)
            .done(function (flight) {
                if (flight._acl.creator !== storage.getData('userInfo').id) {
                    notification.error('You can only edit your own flights!');
                    ctx.redirect('#/details/' + flight._id);
                } else {
                    ctx.flight = flight;
                    ctx.partial('views/flight/edit.hbs')
                }
            });
    };
    const editPost = function (ctx) {
        if (!ctx.params.destination || !ctx.params.origin ||
            ctx.params.cost < 1 || ctx.params.seats < 1) {

            notification.error('Please fill all required fields!');
        } else {
            flightModel.edit(ctx.params)
                .done(function () {
                    notification.info('Flight edited successfully!');
                    ctx.redirect('#/details/' + ctx.params.flightId);
                });
        }
    };

    // TODO DELETE -> check the corect rout to redirect
    const remove = function (ctx) {
        flightModel.remove(ctx.params.flightId)
            .done(function () {
                notification.info('Flight deleted successfully!');
                ctx.redirect('#/myFlights');
            });
    };

    // TODO READ User posts
    const myFlights = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login')
        } else {
            let userId = storage.getData('userInfo').id;
            flightModel.myFlights(userId)
                .done(function(flights){
                        ctx.flights = flights;
                        ctx.partial('views/flight/myFlights.hbs')
                });
        }
    };

    return {
        addGet,
        addPost,
        details,
        editGet,
        editPost,
        remove,
        myFlights
    }
}();