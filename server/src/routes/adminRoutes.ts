import express from 'express';
import { editUser, getUsers, deleteUser } from '../controllers/adminController.js';

const adminRoutes = express.Router();

adminRoutes.get('/users',  getUsers);

adminRoutes.put('/users/:_id', editUser);

adminRoutes.delete('/users/:_id',  deleteUser);

export default adminRoutes;