'use strict';

var app = app || {};

(function (module) {

  let bookView = {};

  /////////////////// ** Page Initialization for Page JS ** /////////////////////

  bookView.initIndexView = () => {
    $('.admin-view').hide();
    $('.update-view').hide();
    $('.create-view').hide();
    $('#book-details').empty();
    app.Book.all.forEach(b => $('#book-view').append(b.toHtml()));
  };

  bookView.initDetailsView = ctx => {
    $('.admin-view').hide();
    $('#book-details').empty();
    $('.update-view').hide();
    $('.create-view').hide();
    $('#book-view').empty();
    console.log('initialize object:', ctx);
    let template = Handlebars.compile($('#details-template').text());
    $('#book-details').show();
    $('#book-details').append(template(new app.Book(ctx)));
  }

  bookView.initCreatePage = () => {
    $('.admin-view').hide();
    $('.update-view').hide();
    $('#book-view').empty();
    $('#book-details').empty();
    $('.create-view').show();
    $('.create-view').on('submit', bookView.submit);
  }

  bookView.initUpdatePage = () => {
    $('.admin-view').hide();
    $('.update-view').hide();
    $('#book-view').empty();
    $('.update-view').show();
    $('#book_id').val(`${$('.details').data('id')}`)
    $('#title-update').val(`${$('.details h2').text()}`)
    $('#author-update').val(`${$('.details h3').text()}`)
    $('#url-update').val(`${$('.details img').attr('src')}`)
    $('#isbn-update').val(`${$('.details h4').text()}`)
    $('#description-update').val(`${$('.details p').text()}`)
    $('.update-view').on('submit', bookView.update);
  }

  bookView.initSearchFormPage = () => {
    $('.admin-view').hide();
    $('#book-details').empty();
    $('.update-view').hide();
    $('.create-view').hide();
    $('#book-view').empty();
    $('.search-results').show()
    $('.search-view').show();
  }

  bookView.initSearchResultsPage = () => {
    $('.admin-view').hide();
    $('#book-details').empty();
    $('.update-view').hide();
    $('.create-view').hide();
    $('#book-view').empty();
    $('.search-view').hide();
    $('.search-results').show();
  }

  /////////////////// ** Book Building for AJAX Requests ** /////////////////////

  bookView.submit = e => {
    e.preventDefault();
    let bookFile = new app.Book({
      title: $('#title').val(),
      author: $('#author').val(),
      image_url: $('#url').val(),
      isbn: $('#isbn').val(),
      description: $('#description').val()
    })
    console.log(bookFile);
    bookFile.insertRecord();

    page('/');
  }

  bookView.update = e => {
    e.preventDefault();
    let updatedBook = new app.Book({
      book_id: parseInt($('#book_id').val()),
      title: $('#title-update').val(),
      author: $('#author-update').val(),
      image_url: $('#url-update').val(),
      isbn: $('#isbn-update').val(),
      description: $('#description-update').val()
    })
    console.log('sending', updatedBook);
    updatedBook.updateRecord();

    page('/');
  }

  module.bookView = bookView;

})(app);
