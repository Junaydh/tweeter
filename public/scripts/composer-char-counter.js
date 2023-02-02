$(document).ready(function() {
  console.log("document ready")

  $('#tweet-text').keypress(function(event) {
    let lenText = $(this).val().length;
    let count = 140 - lenText;

    let counter = $(this).parent().next().children().last();
    counter.html(count);

    if (count < 0) {
      $(counter).addClass('red-count');
      $(counter).removeClass('counter')
    } else {
      $(counter).removeClass('red-count');
      $(counter).addClass('counter');
    }
  })
});

