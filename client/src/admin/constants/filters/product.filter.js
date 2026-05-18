export const filter = [
    {
        name: "filter",
        label: "Filter",
        options: [
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "in_active" },
            { label: "In Stock", value: "stock_in" },
            { label: "Out of Stock", value: "stock_out" },
        ],
    },
    {
        name: "category",
        label: "Category",
    },
];

export const sort = [
    {
        name: "sort",
        label: "Sort",
        options: [
            { label: "Latest", value: "latest" },
            { label: "Oldest", value: "oldest" },
            { label: "Price Low -> High", value: "price_asc" },
            { label: "Price High -> Low", value: "price_desc" },
            { label: "Name: A-Z", value: "name_asc" },
            { label: "Name: Z-A", value: "name_desc" },
        ],
    },
];
