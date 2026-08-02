import type { Collection } from "tinacms";
import Author from "./author";

const Tournament: Collection = {
  label: "Tournaments",
  name: "tournament",
  path: "content/tournaments",
  format: "mdx",
  fields: [
          {
            type: "string",
            name: "title",
            label: "Tournament Name",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "startDate",
            label: "Start Date",
            required: true,
          },
          {
            type: "string",
            name: "location",
            label: "Complex / Venue Location",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Tournament Details",
            isBody: true,
          }
        ]
};
export default Tournament;
