import express, { Application, Request, Response } from "express";
import router from "./Summaries/Interface/Routes/SummaryRouter";
import userRouter from "./Users/Interface/Routes/UserRoutes";
import { errorHandler } from "./Middlewares/ErrorHandler";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("¡Hola, TypeScript con Express!");
});

app.use("/summary",router)
app.use("/user",userRouter)

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


export default app