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

  $('form').submit((event) => {
    event.preventDefault();

    if ($('#tweet-text').val().length > 140) {
      alert('Maximum character limit reached!');
      return;
    } else if ($('#tweet-text').val().length === 0) {
      alert('Please enter some text before submitting!');
      return;
    }
    let postData = $('form').serialize();

    $.post('/tweets/', postData, (response) => {
      $('tweet-text').val('');

      loadTweets();
    })
  })
  loadTweets();
});