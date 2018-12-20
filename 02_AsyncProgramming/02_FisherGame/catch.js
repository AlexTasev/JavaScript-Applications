function attachEvents() {
    const baseUrl = "https://baas.kinvey.com/appdata/kid_HJZAKhG1V/";
    const username = "stamat";
    const password = "123";
    let divCatches = $('#catches');
    const addForm = $('#addForm');

    let btnLoad = $('.load');
    let btnAdd = $('.add');

    btnLoad.on('click', loadCatches);
    btnAdd.on('click', addCatch);

    function sendRequest(method, extension, body) {
        return $.ajax({
            method,
            url: baseUrl + extension,
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            contentType: "application/json",
            data: JSON.stringify(body)
        });
    }

    function loadCatches() {
        sendRequest('GET', 'biggestCatches')
            .then(getCatches)
            .catch(handleError);
    }

    function addCatch() {
        let body = jsonInput(addForm);
        sendRequest('POST', 'biggestCatches', body)
            .then(loadCatches)
            .catch(handleError);
    }

    function jsonInput(addForm) {
        let angler = addForm.find('.angler');
        let weight = addForm.find('.weight');
        let species = addForm.find('.species');
        let location = addForm.find('.location');
        let bait = addForm.find('.bait');
        let captureTime = addForm.find('.captureTime');

        return {
            angler: angler.val(),
            weight: Number(weight.val()),
            species: species.val(),
            location: location.val(),
            bait: bait.val(),
            captureTime: Number(captureTime.val())
        };
    }

    function getCatches(data) {
        divCatches.empty();
        for (let fish of data) {
            let div = $("<div>").addClass("catch").prop("data-id", `${fish._id}`);
            div.append($("<label>Angler</label>")).append($("<input>").attr("type", "text").addClass("angler").val(`${fish.angler}`))
                .append($("<label>Weight</label>")).append($("<input>").attr("type", "number").addClass("weight").val(`${fish.weight}`))
                .append($("<label>Species</label>")).append($("<input>").attr("type", "text").addClass("species").val(`${fish.species}`))
                .append($("<label>Location</label>")).append($("<input>").attr("type", "text").addClass("location").val(`${fish.location}`))
                .append($("<label>Bait</label>")).append($("<input>").attr("type", "text").addClass("bait").val(`${fish.bait}`))
                .append($("<label>Capture Time</label>")).append($("<input>").attr("type", "number").addClass("captureTime").val(`${fish.captureTime}`));
            div.append($("<button>Update</button>").addClass("update").on("click", updateCatch))
                .append($("<button>Delete</button>").addClass("delete").on("click", deleteCatch));
            divCatches.append(div);
        }
    }

    function updateCatch() {
        let element = $(this).parent();
        let body = jsonInput(element);
        let id = element.prop("data-id");
        sendRequest('PUT', `biggestCatches/${id}`, body)
            .then(loadCatches)
            .catch(handleError);
    }

    function deleteCatch() {
        let element = $(this).parent();
        let id = element.prop("data-id");
        sendRequest('DELETE', `biggestCatches/${id}`).then(loadCatches).catch(handleError)
    }

    function handleError(err) {
        console.log(err);
    }
}