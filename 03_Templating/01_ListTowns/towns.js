function attachEvents() {
    $('#btnLoadTowns').on('click', getTownsInfo);

    function getTownsInfo() {
        let townsData = $('#towns').val()
            .split(", ")
            .reduce((acc, cur) => {
                acc.towns.push({"town": cur});
                return acc;
            }, {"towns": []});
        renderTowns(townsData);
    }

    function renderTowns(townsData) {
        $.get('template.hbs')
            .then((res) => {
                let template = Handlebars.compile(res);

                $('#root').html(template(townsData));
                $('#towns').val("");
            })
            .catch((err) => console.log(err))

    }
}