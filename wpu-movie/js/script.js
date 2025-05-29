function searchMovie(){
  let search = $("#search-input");
  //console.log(search);
  $("#movie-list").html("");
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      "apikey":"c3b21e85",
      "s":search.val()
    },
    success: function(result){
      //console.log(result.Title);
      if(result.Response == "True" ){
        let movies = result.Search;

        $.each(movies, function(i, data){
          $("#movie-list").append(`
            <div class="col-md-3">
              <div class="card mb-3">
                <img src="`+data.Poster+`" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">`+data.Title+`</h5>
                  <p class="card-subtitle mb-2 text-muted">`+data.Year+`</p>
                  <a href="#" id="detail-movie" class="card-link" data-toggle="modal" data-id="`+data.imdbID+`" data-target="#exampleModal">See Detail</a>
                </div>
              </div>
            </div>
          `);
        });

        search.val("");

      }else{
        $("#movie-list").html(`
          <div class="col">
            <h1 class="text-center">`+result.Error+`</h1>
          </div>
          `);
      }
    }
  });
}

$("#search-button").on('click', function(){
  searchMovie();
});

$("#search-input").on('keyup', function(e){
  if(e.keyCode === 13){
    searchMovie();
  }
})

function searchDetailMovie(id){
  // let idMovie = $("#idMovie");
   $.ajax({
     url: "http://www.omdbapi.com",
     type: "get",
     dataType: "json",
     data: {
       "apikey":"c3b21e85",
       "i":id
     },
     success: function(movie){
       if(movie.Response == "True"){
         $(".modal-body").html(`
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-4">
                    <img src="`+movie.Poster+`" class="img-fluid"/>
                </div>

                <div class="col-md-8">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Title : `+movie.Title+`</li>
                    <li class="list-group-item">Years : `+movie.Year+`</li>
                    <li class="list-group-item">Released : `+movie.Released+`</li>
                    <li class="list-group-item">Genre : `+movie.Genre+`</li>
                    <li class="list-group-item">Plot : `+movie.Plot+`</li>
                  </ul>
                </div>
              </div>
            </div>
          `);
       }
     }
   });
};

//even binding/ event delegation
$("#movie-list").on('click', '#detail-movie', function(){
  let id = $(this).data('id');
  //console.log(id);
  searchDetailMovie(id);
});