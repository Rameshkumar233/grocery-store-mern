import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const { category, filter, search, sort } = req.query;

        if (search) {
            query.name = {
                $regex: search,
                $options: "i",
            };
        }
        const filterMap = {
            stock_in: { stock: { $gt: 0 } },
            stock_out: { stock: 0 },
            active: { isActive: true },
            in_active: { isActive: false },
        };
        let filterQuery;
        if (category !== "all" || filter !== "all") {
            filterQuery = {
                ...(filterMap[filter] || {}),
                ...(category && { category }),
            };
        }

        const sortMap = {
            price_asc: { price: 1 },
            price_desc: { price: -1 },
            name_asc: { name: 1 },
            name_desc: { name: -1 },
            latest: { createdAt: -1 },
            oldest: { createdAt: 1 },
        };
        const sortOption = sortMap[sort] || { createdAt: -1 };

        const products = await Product.find(filterQuery).sort(sortOption).populate("category");
        const count = await Product.countDocuments(filterQuery);
        res.status(200).json({ success: true, count, products });
    } catch (err) {
        console.log("Failed to get all products:", err.message);
        res.status(500).json({ message: err.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");

        if (!product) return res.status(404).json({ message: "Not found" });

        res.status(200).json({ product });
    } catch (err) {
        console.log("Failed to get product:", err.message);
        res.status(500).json({ message: "Server error: Failed to fetch product" });
    }
};

// --- ADMIN CONTROLLERS ---
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock, unit, packSize, offerPercent, isActive, isFlashSale } = req.body;
        const slug = name.trim().toLowerCase().split(" ").join("-");
        console.log(req.file);
        const product = await Product.create({ name, slug, price, description, category, stock, unit, packSize, offerPercent, isActive, isFlashSale, image: req.file?.path, imageId: req.file?.filename });

        res.status(201).json({ product, success: true, message: "Product created" });
    } catch (err) {
        console.log("Failed to create product:", err.message);
        res.status(500).json({ message: "Server error: Failed to create product" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock, unit, packSize, offerPercent, isActive, isFlashSale } = req.body;
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        if (name) product.name = name;
        if (category) product.category = category;
        if (price !== undefined) product.price = price;
        if (stock !== undefined) product.stock = stock;
        if (packSize !== undefined) product.packSize = packSize;
        if (unit !== undefined) product.unit = unit;
        if (offerPercent !== undefined) product.offerPercent = offerPercent;
        if (description !== undefined) product.description = description;
        if (isActive !== undefined) product.isActive = isActive;
        if (isFlashSale !== undefined) product.isFlashSale = isFlashSale;

        if (req.file) {
            product.image = req.file?.path;
            product.imageId = req.file?.filename;
        }
        await product.save();
        const updatedProduct = await Product.findById(id).populate("category");
        res.status(200).json({ product: updatedProduct, message: "Product Updated successfully", success: true });
    } catch (err) {
        console.log("Failed to update product:", err.message);
        res.status(500).json({ message: "Server error: Failed to update product" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};
