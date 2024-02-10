require('dotenv').config()
const Hapi = require('@hapi/hapi')
const Nes = require('@hapi/nes')
const Inert = require('@hapi/inert')
const routes = require('./routes')

const init = async () => {
  const corsDev = {
    origin: ['*'],
    credentials: true,
    additionalHeaders: ['cache-control', 'x-requested-with']
  }
  const corsProd = {
    credentials: true,
    additionalHeaders: ['cache-control', 'x-requested-with']
  }

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: process.env.NODE_ENV === 'production' ? corsProd : corsDev
    }
  })

  // === Register plugins ===
  await server.register(Nes)
  await server.register(Inert)

  server.subscription('/chronicle/{id}')
  server.subscription('/broadcast/editor/{id}')
  server.subscription('/broadcast/reader/{id}')
  server.subscription('/slider/{reader}')
  // === Register routes ===
  server.route(routes)

  await server.start()
  server.broadcast('welcome!')
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
