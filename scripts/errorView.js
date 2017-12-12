'use strict';

var app = app || {};

(function (module) {
  let errorView = {};
  errorView.initErrorPage = function (err) {
    let template = Handlebars.compile('#error-template');

    $('.container').hide(); //Hides elements with class of container.
    $('.error-view').show(); //Shows elements with class of error-view.
    $('#error-message').empty(); //Empties content for element with an id of error message.
    $('#error-message').append(template(err)); //Renders the err argument into the template, and appends it to an element with an id of error-message.
  };


  errorView.errorCallBack = function (err) { //Define a function called errorCallback which takes an error object as an argument when invoked.
    console.log('Error: ', err); //error logged.
    errorView.initErrorPage(err);
  };

  module.errorView = errorView;

})(app);
