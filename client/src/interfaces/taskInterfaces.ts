export interface Task {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  createdOn: Date;
  completed: boolean;
  owner: string;
}

export type NewTask = Omit<Task, "_id" | "completed" |"createdOn"|"owner">;
