$(document).ready(function () {
    var ticketmasterAPIKey = "eYcby1VpepV4bdXjIICIz5ShzAmEViXW";
    var searchBtn = $("#search-button");

    var mainCarousel = document.querySelector(".carousel");
    M.Carousel.init(mainCarousel, {});

    var calendarGrid = document.querySelectorAll(".datepicker");
    M.Datepicker.init(calendarGrid, {
        showClearBtn: true
    });

    searchBtn.on("click", function (event) {
        event.preventDefault();
        $("#search-container").remove();
        var searchContainer = $("<div>");
        $(searchContainer).attr("id", "search-container")
        $("#big-container").append(searchContainer);
        getEvents();
    });

    function getEvents() {
        var selectedDate = $("#selected-date");
        var dateValue = new Date(selectedDate.val());
        var searchBox = $("#search");
        var locationBox = $("#location");
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&sort=date,asc&apikey=" + ticketmasterAPIKey;
        if (selectedDate.val() !== "") {
            queryURL = queryURL + "&startDateTime=" + dateValue.toISOString().split('.')[0] + "Z";
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
        }).then(function (response) {
            console.log(response);
            if (response._embedded === undefined) {
                $("#search-container").html("No results based on your search");
            };
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
                $(cardLink).attr("href", "index2.html?id=" + response._embedded.events[i].id);
                $(cardLink).text("More Info");
                $(cardLinkDiv).append(cardLink);
                $(card).append(cardContent);
                $(card).append(cardLinkDiv);
                $(column).append(card);
                $(searchRow).append(column);
                $("#search-container").append(searchRow);

                $(cardTitle).text(response._embedded.events[i].name);
                $(venueInput).text(response._embedded.events[i]._embedded.venues[0].name);
                $(dateInput).text(response._embedded.events[i].dates.start.localDate);
            };
        });
    }
});

