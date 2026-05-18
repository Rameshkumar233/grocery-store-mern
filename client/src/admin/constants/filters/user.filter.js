export const filter = [
    {
        name: "status",
        type: "select",
        label: "Status",
        options: [
            { label: "All Status", value: "all" },
            { label: "Active", value: "active" },
            { label: "Blocked", value: "blocked" },
        ],
    },
];

export const sort = [
    {
        name: "sort",
        type: "select",
        label: "Sort",
        options: [
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
        ],
    },
];
