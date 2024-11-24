import { defineField, defineType } from "sanity";
import { MonitorCogIcon } from "lucide-react";

export const skills = defineType({
  name: "skills",
  title: "Skills",
  type: "document",
  icon: MonitorCogIcon,
  fields: [
    defineField({
      name: "skill",
      type: "string",
      title: "Skill",
      validation: (Rule) => Rule.required().error("Skill name is required"),
    }),
    defineField({
      name: "skill_logo",
      type: "image",
      title: "Skill Logo",
      validation: (Rule) => Rule.required().error("A skill logo is required"),
    }),
    defineField({
      name: "level",
      type: "string",
      title: "Proficiency Level",
      options: {
        list: [
          "Beginner",
          "Novice",
          "Intermediate",
          "Competent",
          "Proficient",
          "Advanced",
          "Expert",
          "Master",
        ],
      },
      validation: (Rule) =>
        Rule.required().error("Proficiency level is required"),
    }),
    defineField({
      name: "experience",
      type: "number",
      title: "Years of Experience",
      validation: (Rule) =>
        Rule.min(0).error("Experience must be a positive number"),
    }),
  ],
});
