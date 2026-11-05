// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  // Define a route for tutor documents (PDFs and Images)
  tutorDocument: f({ image: { maxFileSize: "4MB" }, pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // You can add security checks here, but for now we allow it
      return { };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata);
      console.log("file url", file.url);
      return { uploadedBy: "tutor" };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;