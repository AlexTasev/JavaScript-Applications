const petModel = function () {
    let petUrl = `appdata/${storage.appKey}/pets`;

    const add = function (params) {
        let data = {
            "name": params.name,
            "description": params.description,
            "imageURL": params.imageURL,
            "category": params.category,
            "likes": 0
        };

        return requester.post(petUrl, data)
    };

    const myPets = function (userId) {
        let url = petUrl;
        if (userId) {
            url += `?query={\"_acl.creator\":\"${userId}"}`;
        }

        return requester.get(url)
    };

    const allPets = function () {
        let url = petUrl + `?query={}&sort={likes: -1}`;
        return requester.get(url)
    };

    const getPet = function (petId) {
        let detailsUrl = `${petUrl}/${petId}`;

        return requester.get(detailsUrl)
    };

    const upVote = function (petId) {
        let detailsUrl = `${petUrl}/${petId}`;
        return requester.get(detailsUrl)
            .done(function (pet) {
                pet.likes = +pet.likes + 1;
                pet.likes += "";
                return requester.put(detailsUrl, pet);
            });
    };

    const edit = function (ctx) {
        let petId = ctx.params.id;
        let url = `${petUrl}/${petId}`;
        let pet = {
            "name": ctx.params.name,
            "description": ctx.params.description,
            "imageURL": ctx.params.imageURL,
            "category": ctx.params.category
        };
        return requester.put(url, pet);
    };

    const remove = function (petId) {
        let url = petUrl + '/' + petId;
        return requester.del(url)
    };

    return {
        add,
        myPets,
        allPets,
        getPet,
        upVote,
        edit,
        remove
    };
}();