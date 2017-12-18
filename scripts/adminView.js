'use strict'

var app = app || {};

(function (module) {
    const adminView = {};
    adminView.initAdminPage = () => {
        $('.admin-view').show();
    };

    adminView.handleAdmin = () => {
        $('.admin-view').hide();
        $('.update-btn').show();
        $('.delete-btn').show();
    }

    $('admin-view').on('submit', function (e) {
        e.preventDefault();
        let token = e.target.password.value;
        app.Book.validateAdmin(token);
    });

    adminView.handleAdminLogout = () => {
        localStorage.clear();
        $('#logout').hide();
        $('#login').show();
        page('/');
    }

    module.adminView = adminView
})(app);