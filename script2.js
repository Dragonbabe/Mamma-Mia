$(document).ready(function() {
  var ticketmasterAPIKey = "eYcby1VpepV4bdXjIICIz5ShzAmEViXW";
  var weatherAPIKey = "bd0de12b6775f4d6b86662aff41e13a3";
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var product = urlParams.get("id");

  function showEvents() {
    var queryURL =
      "https://app.ticketmaster.com/discovery/v2/events/" +
      product +
      "?apikey=" +
      ticketmasterAPIKey;
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json"
    }).then(function(response) {
      console.log(response);
      var artistName = $("#artist-name");
      $(artistName).text(response.name);
      var artistImage = $("<img>");
      $(artistImage).attr("src", response.images[0].url);
      $("#artist-image").append(artistImage);
    });
  }
  showEvents();

  function getWeather() {
    var weatherQueryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=city=&units=imperial=appid" +
      weatherAPIKey;
    $.ajax({
      url: weatherQueryURL,
      method: "GET"
    }).then(function(results) {
      console.log(results.main.temp);
    });
  }
});
