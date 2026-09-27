import { Category } from "./components/composed/CategoryCard";

// export type Status = "suggestion" | "planned" | "in-progress" | "live";

export enum Status {
  SUGGESTION = "suggestion",
  PLANNED = "planned",
  INPROGRESS = "in-progress",
  LIVE = "live",

}

export interface User {
  name: string;
  username: string;
  image: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User
}

export interface ProductRequest {
  id: number;
  title: string;
  description: string;
  category: Category;
  status: Status;
  upvotes: number;
  comments: Comment[],
};