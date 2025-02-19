import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
  app.post('/subscriptions', {
    schema: {
      summary: 'Subscribes someone to the event',
      tags: ['subscription'],
      description: 'description',
      body: z.object({
        name: z.string(),
        email: z.string().email()
      }),
      response: {
        201: z.object({
          name: z.string(),
          email: z.string().email(),
        })
      }
    }
  }, async (request, reply) => {
    const { name, email } = request.body
  
    // create the inscription in the db
  
    return reply.status(201).send({
      name, 
      email
    });
  })
}