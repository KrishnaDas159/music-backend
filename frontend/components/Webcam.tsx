import React, { useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

interface WebcamProps {
    setCapturedImage: (img: string | null) => void;
    renderFooter?: React.ReactNode;
}

const ReactWebcamCapture: React.FC<WebcamProps> = ({ setCapturedImage, renderFooter }) => {
    const webcamRef = useRef<Webcam>(null);

    const handleCapture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
        }
    };

    return (
        <div className="space-y-4">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-lg shadow-lg w-full"
            />
            <div className="flex justify-between items-center mt-4">
                <Button onClick={handleCapture} className="bg-green-700 hover:bg-green-800">
                    Capture
                </Button>
                {renderFooter}
            </div>

        </div>
    );
};

export default ReactWebcamCapture;


// import { useRef } from "react";
// import Webcam from "react-webcam";

// interface WebcamProps {
//   setCapturedImage: (imageSrc: string | null) => void;
//   type?: "landscape" | "portrait";
// }

// const aspectRatios: Record<"landscape" | "portrait", { width: number; height: number }> = {
//   landscape: { width: 1920, height: 1080 },
//   portrait: { width: 1080, height: 1920 },
// };

// const ReactWebcamCapture: React.FC<WebcamProps> = ({ setCapturedImage, type = "landscape" }) => {
//   const webcamRef = useRef<Webcam>(null);

//   const handleCapture = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setCapturedImage(imageSrc);
//     }
//   };

//   return (
//     <div className="webcam">
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         screenshotQuality={1}
//         videoConstraints={{
//           facingMode: "user",
//           ...aspectRatios[type],
//         }}
//         className="rounded shadow-md"
//       />

//       <button
//         className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//         onClick={handleCapture}
//       >
//         Capture photo
//       </button>
//     </div>
//   );
// };

// export default ReactWebcamCapture;
