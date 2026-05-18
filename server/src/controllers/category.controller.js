import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const getCategories = async (req, res) => {
    try {
        const { isActive, search, sort } = req.query;
        const query = {};
        if (["true", "false"].includes(isActive)) query.isActive = isActive;
        if (search) {
            query.name = {
                $regex: search,
                $options: "i",
            };
        }
        const sortMap = {
            name_asc: { name: 1 },
            name_desc: { name: -1 },
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 },
        };
        const sortOption = sortMap[sort] || { createdAt: -1 };
        const categories = await Category.find(query).sort(sortOption);
        const count = await Category.countDocuments(query);
        res.status(200).json({
            success: true,
            count,
            categories,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// -- ADMIN CONTROLLERS --
export const createCategory = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }
        const slug = name.trim().toLowerCase().split(" ").join("-");

        const existingCategory = await Category.findOne({ slug });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists",
            });
        }
        const category = await Category.create({
            name: name.trim(),
            slug,
            image: req.file.path,
            imageId: req.file.filename,
            isActive,
        });
        res.status(201).json({
            success: true,
            category,
            message: "Category created",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, isActive } = req.body;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        if (name) {
            category.name = name.trim();
            category.slug = name.trim().toLowerCase().split(" ").join("-");
        }
        if (isActive) category.isActive = isActive;
        if (req.file) {
            category.image = req.file?.path;
            category.imageId = req.file?.filename;
        }
        await category.save();
        res.status(200).json({
            success: true,
            category,
            message: "Category Updated",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        const products = await Product.find({ category: id });
        if (products.length > 0) {
            return res.status(400).json({ message: "Category has products. Remove them first." });
        }
        await category.deleteOne();
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
