import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
  
  import type { OurFileRouter } from "@/app/api/uploadthing/core";
  
  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
  
  // Updated styling configuration with better padding
  export const defaultUploadThingStyles = {
    container: "w-full flex flex-col items-center gap-6 py-8",
    allowedContent: "text-gray-500 text-sm",
    button: "ut-ready:bg-indigo-600 ut-ready:hover:bg-indigo-700",
    uploadIcon: "text-indigo-600 w-12 h-12",
  };
  