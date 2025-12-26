import z from "zod";

export const base64ImageSchema = z
  .string()
  .regex(
    /^data:image\/(png);base64,[A-Za-z0-9+/=]+$/,
    "Format base64 invalide"
  );
