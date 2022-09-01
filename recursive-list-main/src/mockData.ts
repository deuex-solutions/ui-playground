import { IFile, IFolder } from "./types/global";
import { v4 as uuid } from "uuid";

export const mockItems: (IFile | IFolder)[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "Components",
        type: "folder",
        children: [
          {
            name: "Sidebar",
            type: "folder",
            children: [],
            id: uuid(),
          },
          {
            name: "Headers",
            type: "folder",
            children: [{ name: "header.tsx", type: "file", id: uuid() }],
            id: uuid(),
          },
          { name: "app.tsx", type: "file", id: uuid() },
          { name: "app.css", type: "file", id: uuid() },
        ],
        id: uuid(),
      },
    ],
    id: uuid(),
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "style.css", type: "file", id: uuid() },
      { name: "index.html", type: "file", id: uuid() },
    ],
    id: uuid(),
  },
];
