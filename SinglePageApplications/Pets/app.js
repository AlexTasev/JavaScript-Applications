const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.before({except: {}}, function () {
        user.initializeLogin();
    });

    this.get('#/', home.index);

    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);

    this.get('#/logout', user.logout);

    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);

    this.get('#/pet/add', pet.addGet);
    this.post('#/pet/add', pet.addPost);

    this.get('#/myPets', pet.myPets);

    this.get("#/details/:petId", pet.details);
    this.get("#/otherDetails/:petId", pet.otherDetails);

    this.get('#/edit/:id', pet.editGet);
    this.put('#/edit/:id', pet.editPost);

    this.get('#/remove/:petId', pet.remove);

    this.get('#/myPets', pet.myPets);

    this.get('#/sortByCategory/:category', pet.sortPets);

    this.get('#/upVote/:id', pet.upVote);
});

$(function () {
    app.run('#/');
});