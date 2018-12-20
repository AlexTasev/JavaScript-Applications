$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let source = $.get('catTemplate.hbs')
            .then((res) => {
                let template = Handlebars.compile(res);
                $('#allCats').html(template({cats}));
                $('button')
                    .each((i, btn) => $(btn).on('click', showHideInfo));

                function showHideInfo() {
                    let btn = $(this);
                    if (btn.text() === "Show status code") {
                        btn.next().css('display', 'block');
                        btn.text("Hide status code")
                    } else {
                        btn.next().css('display', 'none');
                        btn.text("Show status code")
                    }
                }
            });
    }
});
