import feathers from "feathers"

import middleware from "./middleware"
import services from "./services"

import {PORT} from "./config"

const app = feathers()

app.configure(middleware)
app.configure(services)

console.log(process.env.NODE_ENV)

app.listen(PORT)
