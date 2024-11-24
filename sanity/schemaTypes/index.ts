import { type SchemaTypeDefinition } from "sanity";
import { academics } from "@/sanity/schemaTypes/academics";
import { experience } from "@/sanity/schemaTypes/experience";
import { certificates } from "@/sanity/schemaTypes/certificates";
import { professional_skills } from "@/sanity/schemaTypes/professional_skills";
import { skills } from "@/sanity/schemaTypes/skills";
import { projects } from "@/sanity/schemaTypes/projects";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    academics,
    experience,
    certificates,
    professional_skills,
    skills,
    projects,
  ],
};
