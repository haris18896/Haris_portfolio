import { defineField, defineType } from "sanity";
import { FileBadge2Icon } from "lucide-react";

export const professional_skills = defineType({
  name: "professional_skills",
  title: "Professional Skills",
  type: "document",
  icon: FileBadge2Icon,
  fields: [
    defineField({
      name: "skill",
      title: "Skill",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one skill is required"),
    }),
  ],
});
