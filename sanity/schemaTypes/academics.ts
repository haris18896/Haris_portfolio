import { defineField, defineType } from "sanity";
import { School } from "lucide-react";

export const academics = defineType({
  name: "academics",
  title: "Academics",
  type: "document",
  icon: School,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required().error("Institute name is required"),
    }),
    defineField({
      name: "qualification",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Qualification field is required"),
    }),
    defineField({
      name: "start",
      type: "date",
      validation: (Rule) => Rule.required().error("Start Date is required"),
    }),
    defineField({
      name: "end",
      type: "date",
      validation: (Rule) => Rule.required().error("End Date is required"),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Image is required"),
    }),
  ],
});
