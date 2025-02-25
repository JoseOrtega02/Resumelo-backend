import { Router } from "express";
import { SummaryController } from "../Controllers/SummaryController";
import { SummaryRepositorySQL } from "../../Infrastructure/Repositories/SummaryRepositorySQL";

const repositoryInstance = new SummaryRepositorySQL()
const summaryController = new SummaryController(repositoryInstance)
const router = Router()

router.get("/",summaryController.getAll)
router.get("/:id",summaryController.getById)
router.post("/",summaryController.create)
router.put("/",summaryController.edit)
router.delete("/",summaryController.delete)

export default router