import { Loader2 } from "lucide-react";
import Image from "next/image";
import oneEcLogo from "../../../assets/image/oneEClogo.webp";

function CustomizeLoader() {
  return (
    <>
      <div className="flex  flex-col items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
        <div className="animate-bounce">
          <Image src={oneEcLogo} alt="one ec" width={90} />
        </div>
        <div className="loader">
          <p className="text-white">Loading</p>
          <div className="words">
            <span className="word">please</span>
            <span className="word">wait</span>
            <span className="word">please</span>
            <span className="word">wait</span>
            <span className="word">please</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomizeLoader;
