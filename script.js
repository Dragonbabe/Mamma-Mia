$(document).ready(function() {
  var ticketmasterAPIKey = "eYcby1VpepV4bdXjIICIz5ShzAmEViXW";
  // var googleAPIKey = "AIzaSyAJuCV6lv5kU5C-95rJI6OLoWKCBAdTxe4";
  var weatherAPIKey = "bd0de12b6775f4d6b86662aff41e13a3";

  var favoriteList = $("#favorite-list");
  var clearBtn = $("#clear-button");
  var searchBtn = $("#search-button");

  var mainCarousel = document.querySelector(".carousel");
  M.Carousel.init(mainCarousel, {});

  var calendarGrid = document.querySelectorAll(".datepicker");
  M.Datepicker.init(calendarGrid, {});

  searchBtn.on("click", function(event) {
    event.preventDefault();
    $("#search-container").remove();
    var searchContainer = $("<div>");
    $(searchContainer).attr("id", "search-container");
    $("#big-container").append(searchContainer);
    console.log($("#location").val());
    localStorage.setItem("location", $("#location").val());
    getEvents();
  });

  function getEvents() {
    var selectedDate = $("#selected-date");
    var dateValue = new Date(selectedDate.val());
    var searchBox = $("#search");
    var locationBox = $("#location");
    var queryURL =
      "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&sort=date,asc&apikey=" +
      ticketmasterAPIKey;
    if (selectedDate.val() !== "") {
      queryURL =
        queryURL +
        "&startDateTime=" +
        dateValue.toISOString().split(".")[0] +
        "Z";
    }
    if (locationBox.val() !== "") {
      queryURL = queryURL + "&city=[" + locationBox.val() + "]";
    }
    if (searchBox.val() !== "") {
      queryURL = queryURL + "&keyword=" + searchBox.val();
    }

    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json"
    }).then(function(response) {
      console.log(response);
      if (response._embedded === undefined) {
        $("#search-container").html("No results based on your search");
      }
      for (var i = 0; i < response._embedded.events.length; ++i) {
        if (i % 2 === 0) {
          var searchRow = $("<div>");
          $(searchRow).attr("class", "row");
        }

        var column = $("<div>");
        $(column).attr("class", "col s6");
        var card = $("<div>");
        $(card).attr("class", "card");
        var cardContent = $("<div>");
        $(cardContent).attr("class", "card-content");
        var cardTitle = $("<div>");
        $(cardTitle).attr("class", "card-title");
        var venueInput = $("<p>");
        var dateInput = $("<p>");
        $(cardContent).append(cardTitle);
        $(cardContent).append(venueInput);
        $(cardContent).append(dateInput);
        var cardLinkDiv = $("<div>");
        $(cardLinkDiv).attr("class", "card-action");
        var cardLink = $("<a>");
        $(cardLink).attr(
          "href",
          "index2.html?id=" + response._embedded.events[i].id
        );
        $(cardLink).text("More Info");
        $(cardLinkDiv).append(cardLink);
        $(card).append(cardContent);
        $(card).append(cardLinkDiv);
        $(column).append(card);
        $(searchRow).append(column);
        $("#search-container").append(searchRow);

        $(cardTitle).text(response._embedded.events[i].name);
        $(venueInput).text(
          response._embedded.events[i]._embedded.venues[0].name
        );
        $(dateInput).text(response._embedded.events[i].dates.start.localDate);
      }
    });
  }

  // testing localStorage inputs


  localStorage.setItem("Ozzy Osbourne", "1/11/2020");
  localStorage.setItem("Justin Bieber", "2/17/2020");
  localStorage.setItem("Coldplay", "5/21/2020");

  for (var i = 0; i < localStorage.length; ++i) {
    var id = localStorage.key(i);
    var l1 = localStorage.getItem(id);
    var eraseBtn = $("<div>");
    var iconID = "xIcon" + i;

    $(eraseBtn).attr("id", iconID);
    $(eraseBtn).attr("class", "action-btn");
    $(eraseBtn).html(id + " - " + l1);
    $(eraseBtn).attr("class", "artistList");
    var closeIcon = $("<span>");
    $(closeIcon).attr("class", "waves-effect btn-flat");
    var iconX = $("<i>");
    iconX.text("close");
    $(iconX).attr("class", "material-icons");
    closeIcon.append(iconX);
    eraseBtn.append(closeIcon);
    favoriteList.append(eraseBtn);

    // fix this (always removes the last item)
    $(eraseBtn).on("click", function() {
      eraseBtn.remove();
      localStorage.removeItem(id);
    });
  }

  clearBtn.on("click", function() {
    localStorage.clear();
    favoriteList.remove("div");
  });

  // var addBtn = $("#add-button");
  // var artistName = $("#artist-name");
  // var eventDate = $("#event-date")

  // addBtn.on("click", function() {
  //     localStorage.setItem(artistName, eventDate);
  // })
});
