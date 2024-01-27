import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/about/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/about/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/about/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/about/users/:id",
    controller: UserController,
    action: "remove"
}]