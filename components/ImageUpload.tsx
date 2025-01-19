/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import config from "@/lib/config";
import ImageKit from "imagekit";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Authentication request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, signature, expire };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploaRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error);

    toast({
      title: "Image uploaded failed",
      description:"Your could not be uploaded. Please try again",
      variant: "destructive",
    })
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Image uploaded successfully",
      description:`${res.filePath} uploaded successfully`,
    })
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploaRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="upload-test.png"
      />
      <Button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploaRef.current) {
            // @ts-ignore
            ikUploaRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload"
          height={20}
          width={20}
          className="object-contain"
        />
        <p className="text-base text-dark-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </Button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
