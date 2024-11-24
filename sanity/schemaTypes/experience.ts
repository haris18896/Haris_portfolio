import { defineField, defineType } from "sanity";
import { School } from "lucide-react";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  icon: School,
  fields: [
    defineField({
      name: "company_name",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Company name is required"),
    }),
    defineField({
      name: "company_url",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().error("Company URL field is required"),
    }),
    defineField({
      name: "my_role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required().error("Role is required"),
    }),
    defineField({
      name: "company_description",
      title: "Description",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Company description is required"),
    }),
    defineField({
      name: "skill_set",
      title: "Skills Set",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one skill is required"),
    }),
    defineField({
      name: "joining_date",
      title: "Joining",
      type: "date",
      validation: (Rule) => Rule.required().error("Joining date is required"),
    }),
    defineField({
      name: "current_company",
      title: "Current Company",
      type: "boolean",
      validation: (Rule) =>
        Rule.required().error("Current company status is required"),
    }),
    defineField({
      name: "exit_date",
      type: "date",
      title: "Exit Date",
      hidden: ({ parent }) => parent?.current_company === true,
      validation: (Rule) =>
        Rule.custom((exitDate, context) => {
          // @ts-ignore
          if (context.parent?.current_company && exitDate) {
            return "Exit date should not be set when 'Current Company' is true.";
          }
          return true;
        }),
    }),
    defineField({
      name: "company_logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Logo is required"),
    }),
  ],
});
