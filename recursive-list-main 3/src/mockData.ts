import { IFile, IFolder } from "./types/global";
import { v4 as uuid } from "uuid";

export const mockItems: (IFile | IFolder)[] = [
  {
    title: "Folder 1",
    type: "folder",
    children: [{ title: "File 1.A", type: "file", id: uuid() }],
    id: uuid(),
  },
  {
    title: "Folder 2",
    type: "folder",
    children: [
      {
        title: "Folder 2.1",
        type: "folder",
        children: [{ title: "File 2.1.A", type: "file", id: uuid() }],
        id: uuid(),
      },
    ],
    id: uuid(),
  },
  {
    title: "Folder 3",
    type: "folder",
    children: [
      { title: "Folder 3.1", type: "folder", children: [], id: uuid() },
      {
        title: "Folder 3.2",
        type: "folder",
        children: [
          { title: "Folder 3.2.1", type: "folder", children: [], id: uuid() },
        ],
        id: uuid(),
      },
      { title: "File 3.A", type: "file", id: uuid() },
      { title: "File 3.B", type: "file", id: uuid() },
      { title: "File 3.C", type: "file", id: uuid() },
      {
        title: "Folder 3.3",
        type: "folder",
        children: [
          {
            title: "Folder 3.3.1",
            type: "folder",
            children: [
              { title: "File 3.3.1.A", type: "file", id: uuid() },
              { title: "File 3.3.1.B", type: "file", id: uuid() },
              { title: "File 3.3.1.C", type: "file", id: uuid() },
              { title: "File 3.3.1.D", type: "file", id: uuid() },
              { title: "File 3.3.1.E", type: "file", id: uuid() },
            ],
            id: uuid(),
          },
          {
            title: "Folder 3.3.2",
            type: "folder",
            children: [
              {
                title: "Folder 3.3.2.1",
                type: "folder",
                children: [{ title: "File 3.3.2.A", type: "file", id: uuid() }],
                id: uuid(),
              },
            ],
            id: uuid(),
          },
        ],
        id: uuid(),
      },
    ],
    id: uuid(),
  },
];
