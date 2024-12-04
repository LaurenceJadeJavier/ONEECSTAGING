import { Loader2 } from "lucide-react";

function Spinner() {
  return (
    <div className=" w-fit h-full py-2">
      <Loader2 size="18" className=" animate-spin " />
    </div>
  );
}

export default Spinner;
