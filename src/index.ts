import express, { Application, Request, Response } from "express";
import router from "./Summaries/Interface/Routes/SummaryRouter";
import userRouter from "./Users/Interface/Routes/UserRoutes";
import { errorHandler } from "./Middlewares/ErrorHandler";
import loginRouter from "./Users/Interface/Routes/LoginRoutes";
import cors from "cors";
import rateLimit from "express-rate-limit";
const app: Application = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:3000/",
};
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo de 100 peticiones
  message: "Demasiadas peticiones desde esta IP, intenta más tarde.",
  standardHeaders: true, // Incluye headers estándar
  legacyHeaders: false, // Desactiva `X-RateLimit-*` headers antiguos
});
app.use(express.json());
app.use(cors(corsOptions));
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
  res.send("¡Hola, Summary api !");
});

app.use("/summary", router);
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use(errorHandler);

let server: ReturnType<typeof app.listen> | undefined = undefined;

// Solo iniciar el server si NO estamos en test o producción serverless (Vercel)
if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "production") {
  server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Para testing y Vercel
export { app, server };
export default app;
