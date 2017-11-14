$(document).ready(function () {
	console.log("Game time");
	$("#nextDev").hide();
	$('#newSearch').hide();

	$('form').on("submit", function(){
		console.log("get it done");
		var	language = $('input[name="language"]').val();
		var	location = $('input[name="location"]').val();

		console.log(location, language);

		$.ajax({
			type: "POST",
			url: "/",
			data: {
				first: language,
				second: location
			},
			success: function(results) {
				if (results.items.length > 0) {
          $('input').hide();
          $('#findDev').hide();
          $('#nextDev').show();
          $('#newSearch').show();
          var randNum = Math.floor(Math.random() * Object.keys(results.items).length)
          console.log(results.items[randNum]);
          $('#results').html('<a href="'+results.items[randNum].html_url+'">'+results.items[randNum].login+
              '</a><br><img src="'+results.items[randNum].avatar_url+'" class="avatar">')
          // $('input').val('')
        } else {
          $('#results').html('Something went terribly wrong! Please try again.')
        }
			},
			error: function(error) {
				console.log(error);
			}
		});
	});

	$('#newSearch').on('click', function(){
    $('input').val('').show();
    $('#newSearch').hide();
    $('#results').html('');
  });

});