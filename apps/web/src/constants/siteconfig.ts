import { siteconfig as siteconfigraw } from "@repo/business-config";

export const siteconfig = {
  name: siteconfigraw.name,
  tagline: siteconfigraw.tagline,
  description: siteconfigraw.description,
  capitalizedDescription: siteconfigraw.capitalizedDescription,
};
