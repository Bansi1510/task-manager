export interface Task {
  _id?: string;       // optional when creating new task
  title: string;
  description: string;
  date: string;
  completed?: boolean; // optional, can be used later
}