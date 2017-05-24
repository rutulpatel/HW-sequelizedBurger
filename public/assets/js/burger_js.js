$(document).ready(function() {

    function loadToEatData() {
        $.get("/api/all?devoured=0", function(data) {
            console.log(data);
            $("#to-eat-container").empty();
            for (var i = 0; i < data.length; i++) {

                var div = $("<div>");
                var input = $("<input>")
                    .attr({ "type": "text", "disabled": "", "size": 20, "value": data[i].name });
                var inputCust = $("<input>")
                    .attr({ "type": "text", "data-index": data[i].id, "size": 20, "id": "customer_" + data[i].id, "placeholder": "customer?" });
                var button = $("<button>")
                    .attr({ "class": "btn btn-danger btn-sm devour-it-btn", "data-index": data[i].id, "id": "devour_" + data[i].id }).text("Devour it!");

                div.html(input).append(inputCust).append(button);
                $("#to-eat-container").append(div);
            }

            $(".devour-it-btn").on("click", function() {
                if ($("#customer_" + $(this).attr("data-index")).val() !== "") {
                    var clickedData = { data: { "customer_name": $("#customer_" + $(this).attr("data-index")).val() } };
                    $.ajax({
                        method: "PUT",
                        url: "/api/devoured/" + $(this).attr("data-index"),
                        data: clickedData
                    }).done(function() {
                        loadData();
                    });
                } else {
                    alert("Please enter customer name who's going to eat that burger");
                }
            });
        });
    }

    function loadEatenData() {
        $.get("/api/all?devoured=1", function(data) {
            console.log(data);
            $("#eaten-container").empty();
            for (var i = 0; i < data.length; i++) {

                var div = $("<div>");
                var input = $("<input>")
                    .attr({ "type": "text", "disabled": "", "size": 50, "value": (i + 1) + ". " + data[i].name + " (Eaten by " + data[i].customer_name + ")" });
                div.html(input);
                $("#eaten-container").append(div);
            }
        });
    }

    function addBurger(burgerName) {
        if (burgerName && burgerName != "") {
            var data = { "burgerName": burgerName };
            $.post("/api/new", data, function(result) {
                $("#burgerName").val("");
                loadData();
            });
        } else {
            alert("Please enter a burger name...");
        }
    }

    $("#submitBtn").on("click", function() {
        addBurger($("#burgerName").val());
    });

    function loadData() {
        loadToEatData();
        loadEatenData();
    }

    loadData();
});