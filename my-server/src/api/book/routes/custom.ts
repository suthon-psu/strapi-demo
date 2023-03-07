'use strict';

module.exports = {
  routes: [ //custom routes
    {
      method: 'GET',
      path: '/books/:id/like',
      handler: 'book.like'
    }
  ]
}