import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { env } from "./env";
import { subscribeToEventRoute } from "./routes/subescribe-to-event-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: 'http://localhost:3000'
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(subscribeToEventRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP Server running at port ${env.PORT}`)
})