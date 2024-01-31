import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import ResHelper, { HttpSuccessStatus } from "../helper/ResponseHelper"

export class UserController {

    private static get repo() {
        return AppDataSource.getRepository(User)
    }

    static async all(request: Request, response: Response, next: NextFunction) {
        const res = new ResHelper()
        try {
            const data = await UserController.repo.find()
            res.setData(data)
            res.sendSuccessRes(response, HttpSuccessStatus.Success)
        } catch (err) {
            res.sendErrorRes(response, err)
        }
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await UserController.repo.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return UserController.repo.save(user)
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await UserController.repo.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await UserController.repo.remove(userToRemove)

        return "user has been removed"
    }

}