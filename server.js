const jsonServer = require("json-server")
const path = require("path")
const cors = require("cors")

const server = jsonServer.create()
const router = jsonServer.router(path.join("./", "src", "db.json"))
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(middlewares)
server.use(router)

const PORT = process.env.PORT || 3003
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})
