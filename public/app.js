// JSON
$.getJSON("/articles", function (data) {
    // picking up 20 articles from page
    console.log(data);
    for (var i = 0; i < 20; i++) {
        $("#articles").append("<p data-id='" + 
        data[i]._id + "'>" + 
        data[i].title + "<br />" + 
        data[i].link + "</p>" + "<hr>");
    }
});


// P tag click
$(document).on("click", "p", function () {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .done(function (data) {
            console.log(data);
            $("#notes").append("<h4>" + data.title + "</h4>");
            $("#notes").append("<input id='titleinput' name='title' size='55' placeholder='Insert Title'>");
            $("#notes").append("<textarea id='bodyinput' name='body' rows='5' cols='56' placeholder='Write Your Note'></textarea>");
            $("#notes").append(" <button data-id='" + data._id + "' id='savenote' class='btn btn-success'>Save Note</button>");
            if (data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});

$(document).on("click", "#savenote", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .done(function (data) {
            console.log(data);
            $("#notes").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});
