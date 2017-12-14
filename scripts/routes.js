'use strict';

page('/', app.Book.fetchAll(app.bookView.initIndexView));
page('/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailsView));
page('/new', app.bookView.initCreatePage);
page('/update', app.bookView.initUpdatePage);
page('/delete', app.Book.deleteRecord());

page();
