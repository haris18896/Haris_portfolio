import type { StructureResolver } from "sanity/structure";
import { skills } from "@/sanity/schemaTypes/skills";
import { projects } from "@/sanity/schemaTypes/projects";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("academics").title("Academics"),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("certificates").title("Certificates"),
      S.documentTypeListItem("projects").title("Projects"),
      S.documentTypeListItem("skills").title("Skills"),
      S.documentTypeListItem("professional_skills").title(
        "Professional Skills",
      ),
    ]);
