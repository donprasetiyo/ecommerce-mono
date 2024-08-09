/* eslint-disable @next/next/no-img-element */
"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { UploadCloud, X } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { cn } from "@repo/ui/lib/util";

interface IImageUpload extends React.HTMLAttributes<HTMLDivElement> {
  selectedImage: File | null;
  titleElement: React.ReactNode;
  className: string;
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
}

const ImageUpload = ({
  selectedImage,
  setSelectedImage,
  titleElement,
  className,
  ...props
}: IImageUpload) => {
  const [unsupportedImageFormat, setUnsupportedImageFormat] = useState(false);

  const [largeImagesFiles, setLargeImagesFiles] = useState<File[]>([]);
  const [largeImagesResolutions, SetLargeImagesResolutions] = useState<
    HTMLImageElement[]
  >([]);

  const [smallImagesFiles, setSmallImagesFiles] = useState<File[]>([]);
  const [smallImagesResolutions, setSmallImagesResolutions] = useState<
    HTMLImageElement[]
  >([]);

  const [selectedResolution, setSelectedResolution] =
    useState<HTMLImageElement>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        setUnsupportedImageFormat(false);

        // Check image resolution
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          setSelectedResolution(img);
          if (img.width > 1800 || img.height > 1800) {
            setLargeImagesFiles((prevImages) => [...prevImages, file]);
            SetLargeImagesResolutions((prevResolutions) => [
              ...prevResolutions,
              img,
            ]);
          }
          if (img.width < 500 || img.height < 500) {
            setSmallImagesFiles((prevImages) => [...prevImages, file]);
            setSmallImagesResolutions((prevResolutions) => [
              ...prevResolutions,
              img,
            ]);
          }
        };
      } else {
        setSelectedImage(null);
        setUnsupportedImageFormat(true);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Check if the dropped file is an image
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        setUnsupportedImageFormat(false);

        // Check image resolution
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          setSelectedResolution(img);
          if (
            img.width < 500 ||
            img.height < 500 ||
            img.width > 1800 ||
            img.height > 1800
          ) {
            if (img.width > 1800 || img.height > 1800) {
              setLargeImagesFiles((prevImages) => [...prevImages, file]);
              SetLargeImagesResolutions((prevResolutions) => [
                ...prevResolutions,
                img,
              ]);
            }
            if (img.width < 500 || img.height < 500) {
              setSmallImagesFiles((prevImages) => [...prevImages, file]);
              setSmallImagesResolutions((prevResolutions) => [
                ...prevResolutions,
                img,
              ]);
            }
          }
        };
      } else {
        setSelectedImage(null);
        setUnsupportedImageFormat(true);
      }
    }
  };

  const clearFile = () => {
    setSelectedImage(null);
    setUnsupportedImageFormat(false);
    setLargeImagesFiles([]);
    SetLargeImagesResolutions([]);
    setSmallImagesFiles([]);
    setSmallImagesResolutions([]);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex flex-row items-center justify-start">
        {titleElement}
        {selectedImage ? (
          <div className="flex w-full flex-row items-center justify-between">
            <div className="ml-2 flex flex-row items-center justify-start">
              <span className="line-clamp-1 text-xs font-normal uppercase tracking-wide text-gray-500">
                {selectedImage.name}
              </span>
              <Separator orientation="vertical" className="ml-1 h-[1em]" />
         
            </div>
            <Button
              variant={"ghost"}
              size={"xs"}
              onClick={clearFile}
            >
              <X size={20} />
              Clear file
            </Button>
          </div>
        ) : null}
      </div>
      <div
        className={cn(
          `${selectedImage ? "" : "border border-dashed border-gray-400 p-4"} flex h-full flex-row items-center justify-center rounded-md text-center`,
          className,
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        {...props}
      >
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Image"
            className="mx-auto max-w-full rounded-md"
          />
        ) : (
          <div className="text-gray-500">
            <UploadCloud size={110} className="mx-auto text-[#444]" />
            <p className="text-xl">Drag & drop</p>
            <p className="text-xl">your files here</p>
            <p>
              or
              <label
                className="ml-1 cursor-pointer text-blue-600"
                htmlFor="fileInput"
              >
                browse
              </label>
              .
            </p>

            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}

        {unsupportedImageFormat && (
          <p className="text-red-600">Image format not supported</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
