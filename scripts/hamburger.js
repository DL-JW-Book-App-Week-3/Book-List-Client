'use strict';

$('.mainNavDropDown').hide();

$('.navicon').on('click', function(){
    $('.mainNavDropDown').slideToggle(500);
   });