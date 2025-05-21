'use server'

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function uploadImage(file: File): Promise<string> {
  try {
    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);
    
    // Make a POST request to your UploadThing endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/uploadthing/imageUploader`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error("Upload failed");
    }
    
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
} 