$(document).ready(function() {
    var favoriteList = $("#favorite-list");
    var clearBtn = $("#clear-button");

    for (var i = 0; i < localStorage.length; ++i) {
        var id = localStorage.key(i);
        var l1 = localStorage.getItem(id);
        var info = $("<div>");
        var iconID = "xIcon" + i;

        $(info).attr("id", iconID);
        $(info).attr("class", "action-btn");
        $(info).html(id + " - " + l1);
        $(info).attr("class", "artistList");
        var closeIcon = $("<span>");
        $(closeIcon).attr("class", "waves-effect btn-flat");
        var iconX = $("<i>");
        iconX.text("close");
        $(iconX).attr("class", "material-icons");
        closeIcon.append(iconX);
        info.append(closeIcon);
        favoriteList.append(info);

        createBtn("#" + iconID, iconX, id);
    }

    function createBtn (deleteID, deleteBtn, id) {
        $(deleteBtn).on("click", function() {
            $(deleteID).remove();
            localStorage.removeItem(id);
        })
    };

    clearBtn.on("click", function() {
        localStorage.clear();
        favoriteList.remove("div");
    });
});