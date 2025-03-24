
import{  Request, Response } from "express";
import { CreateUseCase } from "../../Application/UseCases/createUseCase";
import { UserRepo } from "../../Domain/Repositories/UserRepo";
import { GetByIdUseCase } from "../../Application/UseCases/getByIdUseCase";
import { GetAllUseCase } from "../../Application/UseCases/getAllUseCase";
import { UpdateUseCase } from "../../Application/UseCases/updateUseCase";
import { DeleteUseCase } from "../../Application/UseCases/deleteUseCase";

export class UserController{
    private repository:UserRepo
    constructor(repo:UserRepo){
        this.repository= repo
    }
    async create(req:Request,res:Response){
        const {name,email} = req.body
        const useCase = new CreateUseCase(this.repository)
        try {
            
            const data = await useCase.exec(name,email)
            
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
     async getById(req:Request,res:Response){
        try {
            const {id} = req.params
            const useCase = new GetByIdUseCase(this.repository)
            const user = await useCase.exec(id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({error:error})

        }
     }
     async getAll(req:Request,res:Response){
        try {
            const useCase= new GetAllUseCase(this.repository)
            const data = await useCase.exec()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({error:error})
        }
     }
     async update(req:Request,res:Response){
        try {
            const {id} = req.params
            const {name,email} = req.body
           
            const useCase = new UpdateUseCase(this.repository)
            const data = await useCase.exec(id,name,email)
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({error:error})
        }
     }
     async delete(req:Request,res:Response){
        try {
            const {id} = req.params
            const useCase = new DeleteUseCase(this.repository)
            const data = await useCase.exec(id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({error:error})
        }
     }
}