'use strict';

page('/', app.Book.fetchAll(app.bookView.initIndexView));
page('/new', app.bookView.initCreatePage);
page('/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailsView));
page('/:id/update', ctx => app.bookView.initUpdatePage(ctx));
page('/:id/delete', ctx => app.Book.deleteRecord(ctx));

page();
