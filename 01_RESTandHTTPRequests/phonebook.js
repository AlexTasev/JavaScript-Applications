function attachEvents() {
    let baseUrl = 'https://phonebook-nakov.firebaseio.com/phonebook';
    let person = $('#person');
    let phone = $('#phone');
    let list = $('#phonebook');
    let loadBtn = $('#btnLoad');
    let createBtn = $('#btnCreate');

    loadBtn.on('click', loadContacts);
    createBtn.on('click', createContact);

    function loadContacts() {
        list.empty();
        $.ajax({
            method: 'GET',
            url: baseUrl + '.json',
            success: successFunc,
            error: handleError
        });
    }

    function successFunc(contacts) {
        for (let user in contacts) {
            list.append($(`<li>${contacts[user].person}: ${contacts[user].phone}</li>`)
                .append($("<button id='dltBtn'>Delete</button>").click(() => deleteContact(user))));
        }
    }
    
    function createContact() {
        let contact = {
            person: person.val(),
            phone: phone.val()
        };
        if (person.val()!== "" && phone.val() !== "") {
            $.ajax({
                method: 'POST',
                url: baseUrl + '.json',
                data: JSON.stringify(contact),
                success: loadContacts,
                error: handleError
            });
            person.val("");
            phone.val("");
        }
    }

    function handleError(err) {
        console.log(err);
    }

    function deleteContact(id) {
        $.ajax({
            method: 'DELETE',
            url: `${baseUrl}/${id}.json`,
            success: loadContacts,
            error: handleError
        });
    }
}