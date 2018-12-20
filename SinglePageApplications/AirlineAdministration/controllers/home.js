 const home = (function(){
    const index = function(ctx) {
        let fl;
        if(userModel.isAuthorized()){
            fl = flightModel.flights(false);
        } else {
            fl = flightModel.flights(true);
        }
        fl.done(function (data) {
            ctx.flights = data;
            ctx.partial('views/home/index.hbs')
        });
    };

    return {
        index
    };
}());