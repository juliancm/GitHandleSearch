'use strict'

function constHandleInput () {

  let inputString ="";

  inputString += `
    <form>
      <fieldset>
      <label for="handleInput">Git Hub Handle:</label>
        <input type="text" id="handledInput">
        <button type="submit" class="searchSubmit">Display</button>
      </fieldset>
    </form>
    <div class='handleDisplayArea'></div>
  `

  $('.container').html(inputString);
}

function displayHandleClick () {

    $('.searchSubmit').on('click', function(event) {
        event.preventDefault();

        if ($('#handledInput').val() === '') {

            alert('please input a handle');

        } else {
          let username = $('#handledInput').val();
            getJson(username);
        }
    });
}

function getJson (username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson =>
      displayJson(responseJson))
    .catch(error => {
        $('.handleDisplayArea').html(`<p>${error.message}</p>`);
    });
}

function displayJson (responseJson) {
  $('.handleDisplayArea').empty();
  for (let i=0; i<responseJson.length; i++) {
  let resultString = ""

  resultString += `<p>${responseJson[i].name}</p><a href="${responseJson[i].clone_url}">${responseJson[i].clone_url}</p>`

  $('.handleDisplayArea').append(resultString);
}
}

constHandleInput();
displayHandleClick ();
