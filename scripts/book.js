'use strict';

var app = app || {};
var __API_URL__ = 'http://localhost:3000';

(function (module) {
  function Book(rdo) { //Object Constructor for Books using rdo(rawDataObject)
    Object.keys(rdo).forEach(key => this[key] = rdo[key]);
  }

  Book.all = [];

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-template').text());

    return template(this);
  };

  /////////////////// ** AJAX Requests  ** /////////////////////

  Book.prototype.insertRecord = function (call) {
    $.post(`${__API_URL__}/api/v1/books`, {title: this.title, author: this.author,image_url: this.image_url, isbn: this.isbn, description: this.description})
      .then(console.log)
      .then(call);
  };

  Book.prototype.updateRecord = function (call) {
    console.log('updating', this);
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${this.book_id}`,
      method: 'PUT',
      data: {title: this.title, author: this.author,image_url: this.image_url, isbn: this.isbn, description: this.description}
    })
      .then(console.log)
      .then(call)
  }

  Book.deleteRecord = function () {
    console.log($('.details').data('id'));
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${$('.details').data('id')}`,
      method: 'DELETE'
    })
      .then(console.log)
      .then(page('/'));
  }

  Book.loadAll = rd => {
    rd.sort((a,b) => a.title > b.title? 1 : b.title > a.title? -1 : 0) // rd(rawData) sorted by title.

    Book.all = rd.map(bo => new Book(bo)); //bo(bookObject) instantiated for each rd(rawData) entry.
  };

  Book.fetchAll = call => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(res => Book.loadAll(res))
      .then(call)
      .catch(err => app.errorView.errorCallBack(err))
  };

  Book.fetchOne = (ctx, call) => {
    console.log('fetching', ctx)
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(res => ctx.book = res)
      .then(call)
      .catch(console.error);
  };

  Book.search = (ctx, call) => {
    console.log('searching', ctx)
    $.get(`${__API_URL__}/api/v1/books/find`)
      .then(res => ctx.book = res)
      .then(call)
      .catch(console.error)
  }

  Book.validateAdmin = function(token) {
    $.get(`${__API_URL__}admin/`, {token})
      .then((result) => {
        if(result) {
          localStorage.token = true;
          app.adminView.handleAdmin();
          $('#login').hide();
          $('#logout').show();
        } else{
          alert('incorrect password')
        }
      })
  };

  module.Book = Book;

})(app);
