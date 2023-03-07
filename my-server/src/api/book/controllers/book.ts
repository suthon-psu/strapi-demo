/**
 * book controller
 */

import { factories } from '@strapi/strapi'
import { parseMultipartData } from '@strapi/utils'

export default factories.createCoreController('api::book.book', ({ strapi }) => ({
  async update(ctx) {
    const entityId = ctx.params.id;
    let entity;

    const book = await strapi.entityService.findOne('api::book.book', entityId, {
      populate: { owner: true },
    });

    if (!book) {
      return ctx.notFound(`Not Found`);
    }

    if (book.owner?.id !== ctx.state.user.id) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.entityService.update('api::book.book', entityId, { data }, { files });
    } else {
      entity = await strapi.entityService.update('api::book.book', entityId, ctx.request.body);
    }
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async like(ctx) {
    const entityId = ctx.params.id;
    try {
      let book = await strapi.entityService.findOne('api::book.book', entityId)
      book = await strapi.entityService.update('api::book.book', entityId, { data: { likeCount: (book.likeCount || 0) + 1 } })
      ctx.body = { ok: 1, likeCount: book.likeCount };
    } catch (err) {
      ctx.body = err;
    }
  },
}));
