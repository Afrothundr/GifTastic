$(document).ready(function() {
	//add intial array of animals
	var animals = ["pink fairy armadillo", "okapi", "glaucus atlanticus", "narwhal", "fossa", "japanese spider crab", "slow loris", "axolotl", "liger", "blobfish", "red panda", "sloth"];
	//add animal array buttons
	addButtons(animals);
	//when you click the submit button
	$("#submit").click(function(event) {
		event.preventDefault();
		//create varible to hold value from text box.
		var newButton = $("#gif-submit").val().trim();
		//push that new value into our animal array
		animals.push(newButton.toLowerCase());
		//run function to add animal buttons to page
		addButtons(animals);
	});

	//when a button we created is clicked
	$(document).on("click", ".gif-button", function() {
		//empty any gifs in our div already
		$("#gifs").empty();
		//add the data-name attr to our searchGif varible
		var searchGif = $(this).attr("data-name");
		//add that variable to the api url
		queryURL = "https://api.giphy.com/v1/gifs/search?api_key=p3BIY6JQuEhiPJvQw52ZySraz4pDFwMX&q=" + searchGif + "&limit=10&offset=0&lang=en";
		//run ajax call using our dynamic URL
		$.ajax({
          url: queryURL,
          method: "GET"
        })
		//when the call is completed,
        .done(function(response) {
        	//create variable to hold our array of gif objects
        	var results = response.data;
        	//run loop based off of how many gif's requested
	        	for (i=0; results.length; i++) {
	        		//for each gif create a rating variable
	        		var rating = results[i].rating;
	        		//check to make sure gif isn't rated r
	        		if (rating !== "r") {
	        			//create a new div
		        		var gif = $("<div>");
		        		gif.addClass("gif-item");
		      			//create a heading for the rating
		        		var ratingElement = $("<h4>");
		        		ratingElement.text("Rating: " + rating);
		        		//add dynamic rating varible to the heading
		        		var imageElement = $("<img>");
		        		//create a new img tag
		        		//add still version of gif
		        		imageElement.attr("src", results[i].images.fixed_height_still.url)
		        		//save the url for the still version of the gif
		        		imageElement.attr("data-still", results[i].images.fixed_height_still.url)
		        		//save the animated version of the gif
		        		imageElement.attr("data-animate", results[i].images.fixed_height.url)
		        		//set the gif-state to still to indicate if it is running
		        		imageElement.attr("data-state", "still");
		        		imageElement.addClass("gif-state");
		        		//add rating and image to the div
		        		gif.append(ratingElement, imageElement);
		        		//add div to our gif area
		        		$("#gifs").prepend(gif);
	        		};
        	};

        });

	});
	//Click listener on gif images
	$(document).on("click", ".gif-state", function() {
		//If the image isn't moving switch the src with the stored animated url then toggle the data-state
		if ($(this).attr("data-state") === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animated");
		} else {
			//else stop the gif by switching the src with the still url and toggle the data state
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		};
	});



	//function that adds the values in the array as buttons to the page.
	function addButtons(array) {
		$("#button-area").empty();
			for (i = 0; i < array.length; i++) {
			var button = $("<button>");
			button.addClass("btn btn-primary gif-button");
			button.attr("data-name", array[i]);
			button.text(array[i]);
			$("#button-area").append(button);
		};
	};


});