import { defineField, defineType } from "sanity";
import { FolderKanbanIcon } from "lucide-react";

export const projects = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  icon: FolderKanbanIcon,
  fields: [
    defineField({
      name: "project_name",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Project name is required"),
    }),
    defineField({
      name: "project_url",
      title: "Project URL",
      type: "url",
    }),
    defineField({
      name: "project_description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required().error("Description is required"),
    }),
    defineField({
      name: "project_logo",
      type: "image",
      title: "Logo",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Logo is required"),
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "skills" }],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one skill is required"),
    }),
  ],
});
