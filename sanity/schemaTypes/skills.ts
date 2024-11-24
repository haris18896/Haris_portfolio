import { defineField, defineType } from "sanity";
import { MonitorCogIcon } from "lucide-react";

export const skills = defineType({
  name: "skills",
  title: "Skills",
  type: "document",
  icon: MonitorCogIcon,
  fields: [
    defineField({
      name: "skill_set",
      title: "Skills Set",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "skill",
              type: "string",
              title: "Skill",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "skill_logo",
              type: "image",
              title: "Skill Logo",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "level",
              type: "string",
              title: "Proficiency Level",
              options: {
                list: [
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                  "Expert",
                  "Master",
                ],
              },
            },
            {
              name: "experience",
              type: "number",
              title: "Years of Experience",
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one skill is required"),
    }),
  ],
});
