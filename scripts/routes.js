'use strict';


if(window.location.pathname !== '/') {
  page.base('/book-list-client');
}

page('/', app.Book.fetchAll(app.bookView.initIndexView));
page('/new', app.bookView.initCreatePage);
page('/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailsView));
page('/:id/update', ctx => app.bookView.initUpdatePage(ctx));
page('/:id/delete', ctx => app.Book.deleteRecord(ctx));
page('/find', app.bookView.initSearchFormPage);

page();
