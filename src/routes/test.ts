import {Router} from 'express'
import {UserController} from '../controller/UserController'

const testRoute = Router()

testRoute.get("/users", UserController.all)
testRoute.get("/users/:id", UserController.one)
testRoute.post("/users", UserController.save)
testRoute.delete("/users/:id", UserController.remove)

export default testRoute