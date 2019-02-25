$(document).ready(function () {

    // some item for array
    var displayedButtons = ["Tiger", "Elephant", "Horse", "Dog", "Monkey"];

    function displayImg() {
        $("#display-images").empty();
        var input = $(this).attr("data-name");
        // giphy url link with api key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=CQe6du4kBxiwxi1kQX8LpvXlnwD4BeJS&limit=9";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            for (var j = 0; j < results.length; j++) {
            // new div for result
                var displayDiv = $("<div>");
                displayDiv.addClass(" card col-3 mt-4 ml-4");
            // img div for image to dispaly
                var image = $("<img>");
                image.addClass('gif card-top ');
            // image attr. for still image
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
            // image attr. for animated gif
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
            // image.attr("class", "card-top gif");
                displayDiv.append(image);
            // variable for rating data 
                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                pRating.addClass('card-body text-center');
                
                displayDiv.append(image);
                displayDiv.append(pRating)
                displayDiv.prependTo($("#display-images"));
            }
        });
    }
// function for ganerated button 
    function renderButtons() {

        $("#display-buttons").empty();

        for (var i = 0; i < displayedButtons.length; i++) {

            var newButton = $("<button>")
            newButton.attr("class", "btn btn-success");
            newButton.attr("id", "input")
            newButton.attr("data-name", displayedButtons[i]);
            newButton.text(displayedButtons[i]);
            $("#display-buttons").append(newButton);
        }
    }
// image and animation play and pause function
    function imageChangeState() {

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }
// to create a button with user input
    $("#submitPress").on("click", function () {

        var input = $("#user-input").val().trim();
        form.reset();
// contrrol for input value string or null
        if(input===""){
            return false
        }else{
            displayedButtons.push(input); 
        }
        // displayedButtons.push(input);

        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});