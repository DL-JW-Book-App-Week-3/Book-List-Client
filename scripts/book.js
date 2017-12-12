'use strict';

let app = app || {};

(function (module) {
  function Book(rdo) { //Object Constructor for Books using rdo(rawDataObject)
    Object.keys(rdo).forEach(key => this[key] = rdo[key]);
  };

  Book.all = [];

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-template').text());

    return template(this);
  };

  Book.loadAll = rd => {
    rd.sort((a,b) => a.title > b.title? 1 : b.title > a.title? -1 : 0) // rd(rawData) sorted by title.

    Book.all = rd.map(bo => new Book(bo)); //bo(bookObject) instantiated for each rd(rawData) entry.
  };

  Book.fetchAll = call => {
    $.get('/books_app')
      .then(res => {
        Book.loadAll(res);
        call();
      })
      .catch(app.errorView.errorCallBack(err));
  };

  module.Book = Book;

})(app);
