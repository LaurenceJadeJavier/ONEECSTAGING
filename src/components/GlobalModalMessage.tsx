"use client";
import success from "../../assets/image/success.png";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { StaticImageData } from "next/image";

type Props = {
  title: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
  buttonName?: string;
  onOk?: () => void;
  imageSrc: StaticImageData; // Change this line
  cancelButtonName?: string;
  onCancel?: () => void;
};

const AdminModalMessage = ({
  title,
  description,
  onClose,
  isOpen,
  buttonName,
  onOk,
  imageSrc,
  cancelButtonName,
  onCancel,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-fit  space-y-3 ">
        <DialogHeader className="flex flex-col items-center text-center">
          <Image src={imageSrc} alt="status image" width={50} height={50} />
          <DialogTitle className="text-[#263238] font-bold text-2xl mt-4">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-2">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-2 justify-center  mt-4 ">
          {cancelButtonName && onCancel && (
            <Button
              type="button"
              className=" w-full text-[#14A139] border border-[#74E291]  px-4 py-2 rounded-md"
              variant={"outline"}
              onClick={onCancel}
            >
              {cancelButtonName}
            </Button>
          )}
          {buttonName && onOk && (
            <Button
              type="button"
              className=" w-full text-[#272829] px-2 py-2 rounded-md bg-[#74E291]"
              onClick={onOk}
              variant={"default"}
            >
              {buttonName}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminModalMessage;
