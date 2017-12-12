'use strict';

var app = app || {};

(function (module) {

  let bookView = {};

  bookView.initIndexView = () => {
    app.Book.all.forEach(b => $('#book-view').append(b.toHtml()));
  };

  module.bookView = bookView;

})(app);
