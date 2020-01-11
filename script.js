$(document).ready(function() {
    var ticketmasterAPIKey = "eYcby1VpepV4bdXjIICIz5ShzAmEViXW";
    var googleAPIKey = "AIzaSyAJuCV6lv5kU5C-95rJI6OLoWKCBAdTxe4";
    var weatherAPIKey = "bd0de12b6775f4d6b86662aff41e13a3";

    var favoriteList = $("#favoriteList");
    var editBtn = $("#edit-button");
    var saveBtn = $("save-button");
    var clearBtn = $("#clear-button");

    var mainCarousel = document.querySelector(".carousel");
    M.Carousel.init(mainCarousel,{});

    var eventTabs = document.querySelector(".tabs");
    M.Tabs.init(eventTabs,{});

    for (var i = 0; i < localStorage.length; ++i) {
        var id = localStorage.key(i);
        var l1 = localStorage.getItem(id);
        var favoriteEvents = $("<span>");
        $(favoriteEvents).html(id + " - " + l1);
        favoriteList.append(favoriteEvents);
    }

    // var faveBtn = $("#favorite-button");
    // var artist = $("#artist-name");
    // var eventDate = $("#event-date")

    // faveBtn.on("click", function() {
    //     localStorage.setItem(artist, eventDate);
    //     localStorage.getItem(artist);
    // })

    clearBtn.on("click", function() {
        localStorage.clear();
        favoriteList.remove(favoriteEvents);
    });


    // function getEvents() {
    //     var queryURL = 
    //         "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=" + ticketmasterAPIKey;
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }) .then(function(response) {
    //         console.log(response);
    //     });
    // }

    // searchBtn.on("click", function(){
    //     var searchUser = $("#search-box")
    //     .val()
    //     .trim();

    // });
});