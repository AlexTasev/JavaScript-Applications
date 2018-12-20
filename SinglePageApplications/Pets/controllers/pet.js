const pet = function () {
    const addGet = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');
        } else {
            ctx.partial('views/pet/add.hbs')
        }
    };

    const addPost = function (ctx) {
        petModel.add(ctx.params)
            .done(function () {
                notification.info('Pet added successfully!');
                ctx.redirect('#/');
            }).fail(function () {
            notification.error('Pet was not added!')
        });
    };

    const myPets = function (ctx) {
        let userId = storage.getData('userInfo').id;
        petModel.myPets(userId)
            .done(function (myPets) {
                ctx.myPets = myPets;
                ctx.partial('views/pet/myPets.hbs')
            });

    };

    const sortPets = function (ctx) {
        const category = ctx.params.category;
        let userId = storage.getData('userInfo').id;
        petModel.allPets()
            .done(function (pets) {
                let otherPets = pets
                    .filter(pet => pet._acl.creator !== userId)
                    .sort((a, b) => Number(b.likes) - Number(a.likes));
                if (category !== 'all') {
                    ctx.allPets = otherPets.filter(pet => pet.category === category);
                } else {
                    ctx.allPets = otherPets;
                }

                ctx.partial('views/home/dashboard.hbs');
            });
    };

    const upVote = function (ctx) {
        const petId = ctx.params.id;
        petModel.upVote(petId)
            .done(function () {
                notification.info('up vote!');
                ctx.redirect('#/');
            })
    };

    const otherDetails = function (ctx) {
        let pet = petModel.getPet(ctx.params.petId)
            .done(function (pet) {
                ctx.pet = pet;
                ctx.partial('views/pet/otherDetails.hbs');
            });
    };

    const editGet = function (ctx) {
        const petId = ctx.params.id;

        petModel.getPet(petId)
            .done(function (pet) {
                ctx.pet = pet;
                ctx.partial('views/pet/details.hbs')
            });
    };

    const editPost = function (ctx) {
        petModel.edit(ctx)
            .done(function () {
                notification.info('Updated successfully');
                ctx.redirect('#/');
            });

    };

    const remove = function (ctx) {
        petModel.remove(ctx.params.petId)
            .done(function () {
                notification.info('Pet removed successfully!');
                ctx.redirect('#/');
            });
    };


    return {
        addGet,
        addPost,
        myPets,
        sortPets,
        upVote,
        otherDetails,
        editGet,
        editPost,
        remove
    }
}();