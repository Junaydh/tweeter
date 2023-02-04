/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(data) {
  const $tweet = `
          <article id="tweet-container">
            <header>
              <div>
                <img src="${data.user.avatars}">
                <p>${data.user.name}</p>
              </div>
              <p>${data.user.handle}</p>
            </header>
            <p id="actual-tweet">${escape(data.content.text)}</p>
            <footer>
              <p>${timeago.format(data.created_at)}</p>
              <div>
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>
  `
  return $tweet;
};

// const $charLimitErr = `
//   <div id="error">
//     <i class="fa-solid fa-triangle-exclamation"></i>
//     <p>  You are over the maximum character limit!  </p>
//     <i class="fa-solid fa-triangle-exclamation"></i>
//   </div>
// `

// const $noTextErr = `
//   <div id="error">
//     <i class="fa-solid fa-triangle-exclamation"></i>
//     <p>  Empty Tweet!  </p>
//     <i class="fa-solid fa-triangle-exclamation"></i>
//   </div>
// `

const renderTweets = function(tweets) {
  let container = $('#tweets-container');
  for (const tweet of tweets) {
    let ret = createTweetElement(tweet);
    container.prepend(ret);
  }
};

$(document).ready(function() {
  const loadTweets = function() {
    $.get('/tweets')
      .then(res => {
        renderTweets(res);
      });
  };
  $('#error').hide();

  $('form').submit((event) => {
    event.preventDefault();

    if ($('#tweet-text').val().length > 140) {
      $('#error > p').text('  You are over the maximum character limit!   ')
      $('#error').slideDown('slow')
      setTimeout(() => {
        $('#error').slideUp('slow');
      }, 5000);
      return;
    } else if ($('#tweet-text').val().length === 0) {
      $('#error > p').text('  Empty Tweet!!  ')
      $('#error').slideDown('slow');
      setTimeout(() => {
        $('#error').slideUp('slow');
      }, 5000);
      return;
    }
    let postData = $('form').serialize();

    $.post('/tweets/', postData, (response) => {
      $('#tweet-text').val('');
      $('#error').hide();
      loadTweets();
    })
  })
  loadTweets();
});