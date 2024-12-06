import { defineQuery } from "groq";

export const ACADEMICS_QUERY =
  defineQuery(`*[_type == 'academics'] | order(_createdAt desc) {
  _id,
    image,
    start,
    end,
    name,
    qualification,
    _createdAt
}`);
