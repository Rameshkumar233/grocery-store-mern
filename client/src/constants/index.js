import { Building2, Compass, Globe, Hash, Layers, MapPin, Phone, User } from "lucide-react";

export const addressFieldConfig = [
    {
        name: "fullName",
        label: "Full Name",
        placeholder: "Enter full name",
        icon: User,
    },
    {
        name: "phone",
        label: "Mobile Number",
        placeholder: "+91 98989 89898",
        icon: Phone,
    },
    {
        name: "address",
        label: "Address",
        placeholder: "House no, street, area",
        icon: MapPin,
    },
    {
        name: "city",
        label: "City",
        placeholder: "Enter city",
        icon: Building2,
    },
    {
        name: "state",
        label: "State",
        placeholder: "Enter state",
        icon: Layers,
    },
    {
        name: "zipCode",
        label: "Pincode",
        placeholder: "Enter pincode",
        icon: Hash,
    },
    {
        name: "country",
        label: "Country",
        placeholder: "Enter Country",
        icon: Globe,
    },
    {
        name: "landmark",
        label: "Landmark (optional)",
        placeholder: "Nearby place or landmark",
        icon: Compass,
    },
];
