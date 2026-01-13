// Full task from server
export interface Task {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  createdOn: string;
  completed: boolean;
}

// Type for user input when creating
export type NewTask = Omit<Task, "_id" | "completed" |"createdOn">;
