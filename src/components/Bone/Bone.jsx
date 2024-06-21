import "./Bone.css";
import axios from "axios";
import { useState, useEffect } from "react";
import cn from "../../images/y.jpg";
import NavBar from "../NavBar/NavBar";

export default function Bone() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageProcessing = async () => {
    if (!selectedFile) {
      return alert("Please select an image file.");
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;
      setBase64Image(base64Data);
    };
    reader.readAsDataURL(selectedFile);
  };

  useEffect(() => {
    const sendDataToBackend = async () => {
      if (base64Image) {
        setLoading(true);
        setError(null);
        const indexOfComma = base64Image.indexOf(",");
        const base64DataOnly = base64Image.substring(indexOfComma + 1);
        const textFileContent = base64DataOnly;
        const textFileContentString = JSON.stringify(textFileContent);
        const textFileBlob = new Blob([textFileContentString], {
          type: "text/plain",
        });

        try {
          const response = await axios.post(
            "https://classify.roboflow.com/bone-break-classification/2?api_key=p9jHLOSM3tJKI3383Wyd",
            textFileBlob,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          if (selectedFile.name.slice(0, 4) === "bone") {
            setData(response.data);
          } else {
            setError("Error handling image");
          }
        } catch (error) {
          setError("An error occurred while processing the image");
        } finally {
          setLoading(false);
        }
      }
    };

    sendDataToBackend();
  }, [base64Image,selectedFile]);

  return (
    <>
      <NavBar />
      <div className="bonesection vh-100 position-relative">
        <img className="w-100 h-100" src={cn} alt="Background" />
        <div className="layer p-5 position-absolute">
          <h1 className="text-white">Bone</h1>
          <p className="mt-5 text-white">
            If You Want to check Your Transsectional Rays Press Upload Image and Click Results
          </p>
          <div className="container mt-5 p-5">
            <div className="row justify-content-between">
              <div className="col-4">
                <label
                  htmlFor="Upload"
                  className="item flex-wrap d-flex justify-content-center rounded-4 align-items-center text-center py-5"
                >
                  <i className="fa-solid mt-3 fa-3x d-block w-100 fa-arrow-up-from-bracket"></i>
                  <h4 className="my-3 w-100">Upload image</h4>
                  <input
                    type="file"
                    onChange={(event) => {
                      setSelectedFile(event.target.files[0]);
                    }}
                    accept="image/*"
                    className="d-none"
                    id="Upload"
                  />
                </label>
              </div>
              <div className="col-4">
                <div
                  className="item d-flex justify-content-center rounded-4 align-items-center text-center py-5"
                  onClick={() => handleImageProcessing()}
                >
                  <h4 className="my-5">Results</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="scan z-3 position-absolute  d-flex justify-content-center align-items-center  top-0 text-center bottom-0 end-0 start-0">
            <i className="fa-solid fa-10x fa-spinner fa-spin"></i>
          </div>
        )}
        {error && (
          <div className="error z-3 position-absolute bg-white  text-danger top-0 text-center bottom-0 end-0 start-0 ">
            <h2>{error}</h2>
          </div>
        )}
        {data && (
          <div className="result z-3 position-absolute bg-white text-danger  top-0 text-center bottom-0 end-0 start-0 ">
            <h2>Results: {data.top}</h2>
          </div>
        )}
      </div>
    </>
  );
}
