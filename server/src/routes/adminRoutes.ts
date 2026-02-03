import express from 'express';
import { editUser, getUsers, deleteUser, getUserTasks } from '../controllers/adminController.js';

const adminRoutes = express.Router();

adminRoutes.get('/users',  getUsers);

adminRoutes.get('/users/tasks/:_id',  getUserTasks);

adminRoutes.put('/users/:_id', editUser);

adminRoutes.delete('/users/:_id',  deleteUser);

export default adminRoutes;