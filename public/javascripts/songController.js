$(document).ready(function() {
    $.getJSON("./songCollection.json", function(data)   {
      let cardContainer = $("#cardContainer");
      cardContainer.addClass("row");
  
      $.each(data, function(index, song) {
        let card = `
          <div class="col-md-3">
            <div class="card mb-4" style="width: 18rem;">
              <img src="${song.image}" class="card-img-top" alt="Album Cover">
              <div class="card-body">
                <h5 class="card-title">${song.AlbumName}</h5>
                <p class="card-text"><strong>Artist:</strong> ${song.artist}</p>
                <p class="card-text"><strong>Year Released:</strong> ${song.year}</p>
                <p class="card-text"><strong>Genre:</strong> ${song.genre}</p>
                <a href="#" class="btn btn-info">Purchase License to Stream</a> <!-- Placeholder button -->
              </div>
            </div>
          `;
          cardContainer.append(card);
        });

        $("#songSearcher").on("input", function() {
          let searchKeyword = $(this).val().toLowerCase(); 
          cardContainer.empty();
          let filteredSongs = data.filter(function(song) {
              return song.AlbumName.toLowerCase().includes(searchKeyword) ||
                     song.artist.toLowerCase().includes(searchKeyword) ||
                     song.genre.toLowerCase().includes(searchKeyword);
          });

          if (filteredSongs.length === 0) {
              cardContainer.append("<p style='font-size: 120px'>&#128546;</p>")
              cardContainer.append("<h1>Whoops - No Matches Found</h1>"); 
          } else {

              $.each(filteredSongs, function(index, song) {
                  let card = `
                      <div class="col-md-3">
                          <div class="card mb-4" style="width: 18rem;">
                              <img src="${song.image}" class="card-img-top" alt="Album Cover">
                              <div class="card-body">
                                  <h5 class="card-title">${song.AlbumName}</h5>
                                  <p class="card-text"><strong>Artist:</strong> ${song.artist}</p>
                                  <p class="card-text"><strong>Year Released:</strong> ${song.year}</p>
                                  <p class="card-text"><strong>Genre:</strong> ${song.genre}</p>
                                  <a href="#" class="btn btn-info">Purchase License to Stream</a>
                              </div>
                          </div>
                      </div>`;
                  cardContainer.append(card); 
              });
          }
      });
  });
});