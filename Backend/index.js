import express from "express";
import router from "./Routes/main.js";
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();

app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use("/output/originalInverse.png", express.static(path.join(__dirname, "./output/originalInverse.png"),{
    setHeaders: (res, path) => {
      res.setHeader("Content-Disposition", `attachment; filename="processed_image.png"`);
      res.setHeader("Content-Type", "image/png");
    }
  }));
app.use("/image-converter/v1",router);

const PORT=5001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});