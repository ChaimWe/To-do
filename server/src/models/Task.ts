import mongoose, { Document, Model } from "mongoose";

// 1️⃣ TypeScript interface
export interface ITask extends Document {
  owner: string;
  title: string;
  description?: string;
  category?: string;
  createdOn: Date;
  completed: boolean;
}

// 2️⃣ Mongoose schema
const taskSchema = new mongoose.Schema<ITask>({
  owner:{type: String, required:true},
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  createdOn: { type: Date, default: Date.now },
  completed: { type: Boolean , default: false},
});

// 3️⃣ Mongoose model
const Task: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);

export default Task;
