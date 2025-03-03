import { useState } from "react";
import axios from "axios";
import { Upload , Image ,ArrowRight,Download,X} from "lucide-react";
import toast from "react-hot-toast";

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleCancel = ()=>{
    setResultImage(null);
    setPreview(null);
    setFile(null);
  }

  const handleDownload = () => {
    if (!resultImage) {
      toast.error("Please select a file first.");
      return;
    }
  
    // Create a hidden <a> element
    const link = document.createElement("a");
    link.href = resultImage;  // The URL of the processed image
    link.setAttribute("download", "processed_image.png"); // Set download filename
    link.style.display = "none"; // Hide it from UI
  
    document.body.appendChild(link);
    link.click(); // Programmatically trigger click
    document.body.removeChild(link); // Clean up
  };
  
  
  

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5001/image-converter/v1/digital-negative", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data.fileURL);
      if (response.data.fileURL) {
        //setResultImage(`http://localhost:5001${response.data.fileURL}`); // Set image URL
        setResultImage(`http://localhost:5001${response.data.fileURL}?t=${new Date().getTime()}`);   // written to prevent browser caching
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="flex items-center justify-center h-screen">
      <div className="border-2 rounded-md sm:w-[700px] lg:w-[800px] h-[80%] p-4 flex flex-col gap-6 items-center">
      <div>
        <h1 className="text-2xl">IMAGE CONVERTER</h1>
      </div>
        
      <div className="border-2 rounded-md sm:w-[600px] lg:w-[700px] h-[85%] flex flex-col gap-4 items-center justify-center">

        {!resultImage &&        
        <div className="flex gap-2 ml-20">
          <div className="flex items-center justify-center">
            <Image/>
          </div>
          <div className="">
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>}
        
        {!resultImage ?
        <div>
          {!preview && <Image className="w-64 h-64 object-cover rounded-md animate-pulse"/>}
          {preview && <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded-md border" />}
          
        </div> : 

        <div className="flex gap-2">
          {preview && <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded-md border" />}
          <div className="flex items-center justify-center">
            <ArrowRight/>
          </div>
          {resultImage && <img src={resultImage} alt="Preview" className="w-64 h-64 object-cover rounded-md border" />}
        </div>
        
        }


        {!resultImage ? 
        <div className="flex gap-2">
          
          <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded-md flex gap-2">
            <div className="flex items-center justify-center">
              <Upload/>
            </div>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div> :
        
        <div className="flex gap-4">
          <button onClick={handleCancel} className="bg-green-500 text-white px-4 py-2 rounded-md flex gap-2">
            <div className="flex items-center justify-center">
              <X className="text-red-700"/>
            </div>
            Cancel
          </button>

          
          <button onClick={handleDownload} className="bg-green-500 text-white px-4 py-2 rounded-md flex gap-2">
            <div className="flex items-center justify-center">
              <Download/>
            </div>
            Download
          </button>
        </div>
        }
        
      </div>
    </div>
    </div>
    
  );
}
