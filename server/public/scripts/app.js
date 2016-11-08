$(document).ready(function () {
  console.log("It's Alive!!!")
  getSongs();

  $('#postSongForm').on('submit', function(event) {
    event.preventDefault();
    var song = {};
    $(this).serializeArray().forEach(function (item) {
      song[item.name] = item.value;
    });
    console.log(song);

    $.ajax({
      type: 'POST',
      url: '/songs',
      data: song,
      success: function (data) {
        getSongs();
      }
    })
  });

  function getSongs() {
    $.ajax({
      type: 'GET',
      url: '/songs',
      success: function (songData) {
        songsToDOM(songData);
      }
    });
  }

  function songsToDOM(songs) {
    $('#songContainer').empty();
    songs.forEach(function (song) {
      var $el = $('<div class="song"></div>');
      $el.append('<h3>' + song.title + '</h3>');
      $el.append('<p>By: ' + song.artist + '</p>');
      $('#songContainer').append($el);
    })
  }
})
