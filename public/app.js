// JSON
$.getJSON("/articles", function (data) {
    // picking up 20 articles from page
    console.log(data);
    for (var i = 0; i < 20; i++) {
        $("#articles").append("<p data-id='" +
            data[i]._id + "'>" +
            data[i].title + `<i class="fa fa-arrow-circle-right" aria-hidden="true"> Add a note!<i class="fa fa-arrow-circle-right" aria-hidden="true"></i></i><br />` +
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
            $("#notes").append("<div><h4>" + data.title + "</h4>");
            $("#notes").append(`<div class="form-group">
            <label for="formGroupExampleInput">Insert Title</label>
            <input type="text" class="form-control" id="titleinput" placeholder="Insert Title"></div>
            <div class="form-group">
            <label for="formGroupExampleInput2">Write Your Note</label>
            <input type="text" class="form-control" id="bodyinput" rows='5' cols='56' placeholder="Write Your Note">
            </div>`);
            $("#notes").append(" <button data-id='" + data._id + "' id='savenote' class='btn btn-success'>Save Note</button></div>");
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
