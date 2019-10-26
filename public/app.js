//function getResults() {
    //$("#topic").empty();
    // Grab the stories as a json//
    $.getJSON("/all", function (data) {
        // $("button").on(click, function () {
        //Loop for each//
        for (let i = 0; i < data.length; i++) {
            let clickLink = "https://www.sciencealert.com/" + data[i].link;
            let nextPage = "' target='" + "_blank"
            let inputText = "<input type='" + "text" +"'>" 
              $("#topic").append(
                //Display Title//
                "<p data-id='" +
                  data[i]._id +
                  "'>" +
                  data[i].title +
                  "</p>" +

                  //Link for Click and re-route to new page//
                  "<a href='" +
                  clickLink +
                  nextPage +
                  "'>" +
                  "Article" +
                  "</a>" +
                  "<br />" 

                //   //Input Form//
                //   "<form>" +
                //   inputText +
                //   "</form>" +
                //   "<br />" +
                  
                //   //Submit buttons//
                //   "<button>" +
                //   "Submit" +
                //   "</button>"
              );
        }
            $(document).on("click", "button", function() {
                $("#make-comment").empty();
                let thisId = $(this).attr("data-id");
                $.ajax({
                    method: "GET",
                    url: "/" + thisId
                })
                    .then(function (data) {
                        console.log(data)
                    });
            });
        $.ajax({
          method: "POST",
          url: "/submit/" + thisId,
          data: {
            name: $("#userName").val(),
            title: $("#title").val(),
            comment: $("#comment").val()
          }
        });


    });