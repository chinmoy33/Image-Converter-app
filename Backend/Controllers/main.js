import { fileURLToPath } from "url";
import path from "path";
import { spawn } from "child_process";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const digitalNegative=(req,res)=>{
    const inputPath = req.file.path;
    const outputPath = path.resolve(__dirname, "../output/originalInverse.png");

    const deleteFile = (filePath) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File deleted successfully:', filePath);
          }
        });
      };

    
    const javaProcess = spawn("java", ["-cp", path.resolve(__dirname, "../java"), "ColorImageInverse", inputPath]);



    javaProcess.stdout.on("data", (data) => {
        console.log(`Java Output: ${data}`);
    });

    javaProcess.stderr.on("data", (data) => {
        console.error(`Java Error: ${data}`);
    });

    javaProcess.on("close", (code) => {
        if (code === 0) {
            // res.download(outputPath, "originalInverse.png", (err) => {
            //     if (err) {
            //         console.error("Error downloading file:", err);
            //         res.status(500).send("Error downloading file.");
            //     }
            // });
            deleteFile(inputPath);
            res.status(200).json({ fileURL: `/output/originalInverse.png` });
            
        } else {
            res.status(500).send("Error processing image.");
        }
    });
}