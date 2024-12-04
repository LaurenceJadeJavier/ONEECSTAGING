import Image from "next/image";
import { Button } from "./ui/button";
import logo from "../../assets/image/whitelogo.png";
import { MdOutlineFolderShared } from "react-icons/md";
import Link from "next/link";

function Sidebar() {
  return (
    <>
      <div className="w-56 bg-[#263238] min-h-screen flex flex-row fixed h-full  ">
        <div className="w-full flex flex-col justify-between my-6 px-2 ">
          <div className="mx-auto">
            <Image src={logo} alt="logo" />
            <Link
              href={"/"}
              className="flex flex-row gap-3 items-center  text-white text-sm pt-10"
            >
              <MdOutlineFolderShared color="white" size={22} />
              <p>Coop Accounts</p>
            </Link>
          </div>
          <div>
            <Button
              size={"sm"}
              variant={"ghost"}
              className="w-full bg-[#74E291] text-[#272829]"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
