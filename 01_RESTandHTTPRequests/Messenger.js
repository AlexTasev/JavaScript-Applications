function attachEvents() {
    let author = $('#author');
    let content = $('#content');
    let textArea = $('#messages');

    let baseUrl = 'https://messenger-17181.firebaseio.com/';

    loadMessages();

    let submitBtn = $('#submit');
    let refreshBtn = $('#refresh')
    submitBtn.on('click', postData);
    refreshBtn.on('click', loadMessages);

    function postData() {
        if (author.val() === "" || content.val() === "") {
            return;
        }
        let object = {
            author: author.val(),
            content: content.val(),
            timestamp: Date.now()
        };
        $.ajax({
            method: "POST",
            url: baseUrl + '.json',
            data: JSON.stringify(object),
            success: () => {
                author.val("");
                content.val("")
            },
            error: handleError
        });
    }

    function loadMessages() {
        $.ajax({
            method: "GET",
            url: baseUrl + '.json',
            success: displayMsg,
            error: handleError
        })
    }

    function displayMsg(data) {
        let text = "";
        let sortedIds = Object.keys(data)
            .sort((a, b) => sortByDate(a, b, data));
        for (let id of sortedIds) {
            text += data[id].author + ": " + data[id].content + "\n";
        }
        textArea.text(text);
    }

    function sortByDate(obj1, obj2, data) {
        let timeOne = data[obj1].timestamp;
        let timeTwo = data[obj2].timestamp;
        return timeOne - timeTwo;
    }

    function handleError(err) {
        console.log(err);
    }
}