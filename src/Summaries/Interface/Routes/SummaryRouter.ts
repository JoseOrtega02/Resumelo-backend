import { Router } from "express";
import { SummaryController } from "../Controllers/SummaryController";
import { SummaryRepositorySQL } from "../../Infrastructure/Repositories/SummaryRepositorySQL";
import { CloudflareRepositoryR2 } from "../../Infrastructure/Repositories/CloudfareRepositoryR2";
import { CLOUDFLARE_URL_R2 } from "../../../config.env";
import { AuthHandler } from "../../../Middlewares/AuthHandler";
import multer from "multer";
import { LikesRepositorySQL } from "../../../Likes/infrastructure/Repositories/LikesRepositorySQL";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const repositoryInstance = new SummaryRepositorySQL();
const likesRepository = new LikesRepositorySQL();
const documentRepositoryInstance = new CloudflareRepositoryR2(
  "resumelo-test",
  CLOUDFLARE_URL_R2 || ""
);
const summaryController = new SummaryController(
  repositoryInstance,
  documentRepositoryInstance,
  likesRepository
);
const router = Router();

router.get("/", summaryController.getAll.bind(summaryController));
router.get("/:id", summaryController.getById.bind(summaryController));
//protected routes
router.post(
  "/",
  AuthHandler,
  upload.single("pdf"),
  summaryController.create.bind(summaryController)
);
router.put("/:id", AuthHandler, summaryController.edit.bind(summaryController));
router.delete(
  "/:id",
  AuthHandler,
  summaryController.delete.bind(summaryController)
);

export default router;
