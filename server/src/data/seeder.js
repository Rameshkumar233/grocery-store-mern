import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import dotenv from "dotenv";
import { connectDB } from "../config/connectDB.js";
import { categories, products } from "./seedData.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        const existingData = await Category.find({});
        // Clear existing data to avoid duplicates
        if (existingData) {
            await Category.deleteMany();
            await Product.deleteMany();
        }

        // We add slugs here if the model doesn't auto-generate them
        const preparedCategories = categories.map((cat) => ({
            ...cat,
            slug: cat.name.toLowerCase().split(" ").join("-"),
        }));

        const createdCategories = await Category.insertMany(preparedCategories);
        console.log("Categories Seeded! ✅");

        // Insert Products and Link to Categories
        const categoryMap = {};
        createdCategories.forEach((cat) => {
            categoryMap[cat.slug] = cat._id;
        });
        for (const product of products) {
            const slug = product.category.trim().toLowerCase().split(" ").join("-");
            if (!categoryMap[slug]) {
                // create new category
                const newCategory = await Category.create({
                    name: product.category,
                    slug,
                    image: `/images/categories/${product.category}.jpg`,
                });

                categoryMap[slug] = newCategory._id;
            }
        }

        // Attach category IDs to products
        const productsWithCategory = products.map((product) => ({
            ...product,
            category: categoryMap[product.category.toLowerCase().split(" ").join("-")],
            slug: product.name.toLowerCase().split(" ").join("-"),
        }));

        await Product.insertMany(productsWithCategory);
        console.log("Products Seeded! ✅");

        console.log("Data Imported Successfully!");
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Category.deleteMany();
        await Product.deleteMany();
        console.log("Data Destroyed! 🗑️");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Check command line arguments
if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
