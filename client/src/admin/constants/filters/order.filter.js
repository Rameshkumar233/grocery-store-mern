export const filter = [
    {
        name: "status",
        label: "Status",
        options: [
            { label: "All Status", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Processing", value: "processing" },
            { label: "Shipped", value: "shipped" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "cancelled" },
        ],
    },
];

export const sort = [
    {
        name: "sort",
        label: "Sort",
        options: [
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
        ],
    },
];
