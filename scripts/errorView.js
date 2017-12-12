'use strict';

let errorView = {
    err: function initErrorPage(err) {
        let source   = document.getElementById('error-template').innerHTML;
        let template = Handlebars.templates['error-template'];
        $('.container').hide(); //hides elements with class of container
        $('.error-view').show(); //shows elements with class of error-view
        $('.error-message').empty(); //empties content for element with an id of error message
        $('.error-message').append(); //
        
    }
};

