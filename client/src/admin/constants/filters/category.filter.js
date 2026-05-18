export const filter = [
    {
        name: "isActive",
        label: "Status",
        options: [
            { label: "All Status", value: "all" },
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
        ],
    },
];

export const sort = [
    {
        name: "sort",
        label: "Sort",
        options: [
            { label: "Latest", value: "latest" },
            { label: "Oldest", value: "oldest" },
            { label: "Name: A-Z", value: "name_asc" },
            { label: "Name: Z-A", value: "name_desc" },
        ],
    },
];
