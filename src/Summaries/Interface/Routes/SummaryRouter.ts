import { Router } from "express";
import { SummaryController } from "../Controllers/SummaryController";
import { SummaryRepositorySQL } from "../../Infrastructure/Repositories/SummaryRepositorySQL";

const repositoryInstance = new SummaryRepositorySQL()
const summaryController = new SummaryController(repositoryInstance)
const router = Router()

router.get("/",summaryController.getAll.bind(summaryController))
router.get("/:id",summaryController.getById.bind(summaryController))
router.post("/",summaryController.create.bind(summaryController))
router.put("/:id",summaryController.edit.bind(summaryController))
router.delete("/:id",summaryController.delete.bind(summaryController))

export default router