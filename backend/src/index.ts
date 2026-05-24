import fastify from 'fastify'
import "dotenv/config"

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

const port = Number(process.env.PORT) || 5000;

server.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})