import mongoose, { Document, Model } from "mongoose";

// 1️⃣ TypeScript interface
export interface ITask extends Document {
  title: string;
  description?: string;
  category?: string;
  createdOn: string;
  completed: boolean;
}

// 2️⃣ Mongoose schema
const taskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  createdOn: { type: String },
  completed: { type: Boolean, required: true },
});

// 3️⃣ Mongoose model
const Task: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);

export default Task;
