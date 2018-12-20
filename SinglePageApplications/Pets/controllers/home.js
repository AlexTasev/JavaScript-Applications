const home = (function (ctx) {
    const index = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.partial('views/home/index.hbs')
        } else {
            let req = petModel.allPets();
            req
                .done(function (allPets) {
                    let userId = storage.getData('userInfo').id;
                    let otherPets = allPets
                        .filter(p => p._acl.creator !== userId)
                        .sort((a, b) => Number(b.likes) - Number(a.likes));
                    ctx.allPets = otherPets;
                    ctx.partial('views/home/dashboard.hbs')
                });
        }
    };

    return {
        index
    };
}());