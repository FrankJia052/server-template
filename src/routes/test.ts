import {Router} from 'express'
import {UserController} from '../controller/UserController'

const testRoute = Router()

testRoute.get("/users", UserController.all)
testRoute.get("/users/:id", UserController.prototype.one)
testRoute.post("/users", UserController.prototype.save)
testRoute.delete("/users/:id", UserController.prototype.remove)

export default testRoute