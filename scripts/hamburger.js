'use strict';

$('.drop-down').hide();

$('.navicon').on('click', function () {
    $('.drop-down').slideToggle(500);
});