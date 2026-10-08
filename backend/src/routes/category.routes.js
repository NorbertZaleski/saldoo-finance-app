import express from 'express';
import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory
} from '../controllers/category.controller.js';

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(createCategory);

router.route('/:id')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

router.route('/:id/subcategories')
    .post(addSubcategory);

router.route('/:id/subcategories/:subId')
    .put(updateSubcategory)
    .delete(deleteSubcategory);

export default router;