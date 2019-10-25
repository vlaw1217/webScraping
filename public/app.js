// Grab the stories as a json//
$.getJSON("/news", function(data) {
  // $("button").on(click, function () {
  //Loop for each//
  for (let i = 0; i < data.length; i++) {
    let clickLink = "https://www.sciencealert.com/" + data[i].link;
    let nextPage = "' target='" + "_blank" 
      $("#topic").append(
        "<p data-id='" +
          data[i]._id +
          "'>" +
          data[i].title +
          //"<br />" +
          //data[i].link +
          "</p>" +
          "<a href='" +
          clickLink +
          nextPage +
          "'>" +
          "Article" +
          "</a>"
      );
  }
});

// $("#btn").on(click, function() {
//   let button = www.sciencealert.com + data[i].title;
//   $.ajax({
//     method: "GET",
//     url: button
//   }).then(function(data) {
//     console.log(data);
//   });
// });

// $("a").on("click", "a", function () {
//     let thisId = $(this).attr("data-id");

//     $.ajax({
//         method: "GET",
//         url: "/news/" + thisId
//     })
//     .then(function (data) {
//         console.log(data)
//     });
// });
