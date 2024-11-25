import { defineField, defineType } from "sanity";
import { ShieldCheckIcon } from "lucide-react";

export const certificates = defineType({
  name: "certificates",
  title: "Certificates",
  type: "document",
  icon: ShieldCheckIcon,
  fields: [
    defineField({
      name: "certificate_name",
      title: "Certificate Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Certificate name is required"),
    }),
    defineField({
      name: "licence_no",
      title: "Licence Number",
      type: "string",
      validation: (Rule) => Rule.required().error("Licence number is required"),
    }),
    defineField({
      name: "certificate_url",
      title: "Certificate URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().error("Certificate URL is required"),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
