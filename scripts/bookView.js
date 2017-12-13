'use strict';

var app = app || {};

(function (module) {

  let bookView = {};

  // bookView.bookDetails = () => {
  //   $('.book').on('click', function(e) {
  //     console.log('clicked', $(this).data('id'))
  //     // app.Book.fetchOne($(this).data('id'))
  //     page(`/:${(this).data('id')}`)
  //     e.preventDefault()
  //   })
  // }

  bookView.initIndexView = () => {
    $('#book-details').empty();
    app.Book.all.forEach(b => $('#book-view').append(b.toHtml()));
  };

  bookView.initDetailsView = ctx => {
    $('#book-view').empty();
    console.log('initialize object:', ctx)
    let template = Handlebars.compile($('#details-template').text());
    $('#book-details').show();
    $('#book-details').append(template(new app.Book(ctx)))
  }

  module.bookView = bookView;

})(app);
