import { Router } from "express";
import { SummaryController } from "../Controllers/SummaryController";
import { SummaryRepositorySQL } from "../../Infrastructure/Repositories/SummaryRepositorySQL";
import { CloudflareRepositoryR2 } from "../../Infrastructure/Repositories/CloudfareRepositoryR2";
import { CLOUDFLARE_URL_R2 } from "../../../config.env";

const repositoryInstance = new SummaryRepositorySQL()
const documentRepositoryInstance = new CloudflareRepositoryR2("resumelo-test",CLOUDFLARE_URL_R2 || "")
const summaryController = new SummaryController(repositoryInstance,documentRepositoryInstance)
const router = Router()

router.get("/",summaryController.getAll.bind(summaryController))
router.get("/:id",summaryController.getById.bind(summaryController))
router.post("/",summaryController.create.bind(summaryController))
router.put("/:id",summaryController.edit.bind(summaryController))
router.delete("/:id",summaryController.delete.bind(summaryController))

export default router