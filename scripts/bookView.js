'use strict';

var app = app || {};

(function (module) {

  let bookView = {};

  /////////////////// ** Page Initialization for Page JS ** /////////////////////

  bookView.initIndexView = () => {
    $('.update-view').hide();
    $('.create-view').hide();
    $('#book-details').empty();
    app.Book.all.forEach(b => $('#book-view').append(b.toHtml()));
  };

  bookView.initDetailsView = ctx => {
    $('.update-view').hide();
    $('.create-view').hide();
    $('#book-view').empty();
    console.log('initialize object:', ctx);
    let template = Handlebars.compile($('#details-template').text());
    $('#book-details').show();
    $('#book-details').append(template(new app.Book(ctx)));
    $('button[data-id="update-btn"]').on('click', page('/update'));
    $('button[data-id="delete-btn"]').on('click', page('/delete'));
  }

  bookView.initCreatePage = () => {
    $('.update-view').hide();
    $('#book-view').empty();
    $('#book-details').empty();
    $('.create-view').show();
    $('.create-view').on('submit', bookView.submit);
  }

  bookView.initUpdatePage = () => {
    $('.update-view').hide();
    $('#book-view').empty();
    $('.update-view').show();
    $('.create-view').on('submit', bookView.update);
  }

  /////////////////// ** Book Building for AJAX Requests ** /////////////////////

  bookView.submit = e => {
    e.preventDefault();
    let bookfile = new app.Book({
      title: $('#title').val(),
      author: $('#author').val(),
      image_url: $('#url').val(),
      isbn: $('#isbn').val(),
      description: $('#description').val()
    })

    bookfile.insertRecord();

    page('/');
  }

  bookView.update = e => {
    e.preventDefault();
    let updatedBook = new app.Book({
      book_id: $('.details').data('id'),
      title: $('#title').val(),
      author: $('#author').val(),
      image_url: $('#url').val(),
      isbn: $('#isbn').val(),
      description: $('#description').val()
    })

    updatedBook.updateRecord();

    page('/');
  }

  module.bookView = bookView;

})(app);
