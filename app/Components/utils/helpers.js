// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// This variable will be pre-programmed with our authentication key (the one we received when we registered)
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// These variables will hold the results we get from the user's inputs via HTML
/*var queryTerm 	= "";*/
var numResults 	= 5;
/*var startYear 	= 0;*/
/*var endYear		= 0;*/

// Based on the queryTerm we will create a queryURL 
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=71365a2b66b74a908a68b1769174939d&q="+input01+"&begin_date="+input03+"&end_date="+input04;
// Array to hold the various article info
var articleCounter = 0;

// Helper Functions (in this case the only one is runQuery)
var helpers = {


	 // This runQuery function expects two parameters (the number of articles to show and the final URL to download data from)
runQuery: function (searchTerm, startYear, endYear){

/*	// The AJAX function uses the URL and Gets the JSON data associated with it. The data then gets stored in the variable called: "NYTData"
	$.ajax({url: queryURL, method: "GET"}) 
		.done(function(NYTData) {*/
return axios.get(queryURLBase + searchTerm + "&begin_date=" + startYear + "&end_date=" + endYear)
			.then(function(NYTData){
				console.log(NYTData);
				return NYTData.data.response.docs;

			// Here we are logging the URL so we have access to it for troubleshooting
			console.log("------------------------------------")
			console.log("URL: " + queryURLBase + searchTerm + "&begin_date=" + startYear + "&end_date=" + endYear);
			console.log("------------------------------------")

			// Here we then log the NYTData to console, where it will show up as an object.
			console.log("*******" + NYTData + "*******");
			console.log("------------------------------------")

			// Loop through and provide the correct number of articles
			/*for (var i=0; i<5; i++) {

					// Add to the Article Counter (to make sure we show the right number)
					articleCounter++;

					// Create the HTML Well (Section) and Add the Article content for each
					var wellSection = $("<div>");
					wellSection.addClass('well');
					wellSection.attr('id', 'articleWell-' + articleCounter)
					$('#wellSection').append(wellSection);

					// Confirm that the specific JSON for the article isn't missing any details
					// If the article has a headline include the headline in the HTML
					if(NYTData.response.docs[i].headline != "null")
					{
						$("#articleWell-"+ articleCounter).append('<h3 class="articleHeadline"><span class="label label-primary">' + articleCounter + '</span><strong>   ' + NYTData.response.docs[i].headline.main + "</strong></h3>");
						
						// Log the first article's Headline to console.
						console.log(NYTData.response.docs[i].headline.main);
					}
					
					// If the article has a Byline include the headline in the HTML
					if( NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original"))
					{
						$("#articleWell-"+ articleCounter).append('<h5>' + NYTData.response.docs[i].byline.original + "</h5>");

						// Log the first article's Author to console.
						console.log(NYTData.response.docs[i].byline.original);
					}

					// Then display the remaining fields in the HTML (Section Name, Date, URL)
					$("#articleWell-"+ articleCounter).append('<h5>Section: ' + NYTData.response.docs[i].section_name + "</h5>");
					$("#articleWell-"+ articleCounter).append('<h5>' + NYTData.response.docs[i].pub_date + "</h5>");
					$("#articleWell-"+ articleCounter).append("<a href='" + NYTData.response.docs[i].web_url + "'>" + NYTData.response.docs[i].web_url + "</a>");

					// Log the remaining fields to console as well
					console.log(NYTData.response.docs[i].pub_date);
					console.log(NYTData.response.docs[i].section_name);
					console.log(NYTData.response.docs[i].web_url);	
			}*/
		});

},





/*
	// This function serves our purpose of running the query to geolocate. 
	runQuery: function(location){

		console.log(location);

		//Figure out the geolocation
		var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;

		return axios.get(queryURL)
			.then(function(response){

				console.log(response);
				return response.data.results[0].formatted;
		})

	},*/

	// This function hits our own server to retrieve the record of query results
	getHistory: function(){

		return axios.get('/api')
			.then(function(response){

				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postHistory: function(article, yearS, yearE){

		return axios.post('/api', {location: location, yearS: yearS, yearE:yearE})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}


// We export the helpers function 
module.exports = helpers;