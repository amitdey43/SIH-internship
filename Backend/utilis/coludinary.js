import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import path from "path"

cloudinary.config({
  cloud_name:"dbenulf4m",
  api_key:"228915219323633",
  api_secret:"oHsKNELO62VAIO8ot0gbwgcPMTE",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const uniqueName = `${file.fieldname}-${Date.now()}`;

    if (file.fieldname === "profilePic") {
      return {
        folder: "profilePics",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: uniqueName,
        access_mode: "public",
      };
    }

    if (file.fieldname === "resume") {
      return {
        folder: "resumes",
        resource_type: "image", 
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id:uniqueName,
        access_mode: "public",
      };
    }

    return {
      folder: "misc",
      resource_type: "auto",
      public_id: uniqueName,
      access_mode: "public",
    };
  },
});

export const upload = multer({ storage });
