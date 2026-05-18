import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import Table from "./Table";
import Modal from "../../shared/ui/Modal";
import ToggleSwitch from "../../shared/ui/ToggleSwitch";
import ProductImage from "../../shared/ui/ProductImage";
import useAdminCategoryStore from "../store/useAdminCategoryStore";

const CategoriesTable = ({ categories }) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState({ type: null, data: null });
    const { deleteCategory, updateCategoryStatus, error } = useAdminCategoryStore();
    const headers = [
        { label: "Image" },
        { label: "Name" },
        { label: "Slug" },
        { label: "Status", className: "text-center" },
        { label: "Actions", className: "text-center sticky right-0 bg-gray-300 shadow-[-8px_0_10px_-4px_#00000025]" },
    ];
    const handleStatusToggle = async (id, status) => {
        const newStatus = !status;
        await updateCategoryStatus(id, newStatus);
    };
    const handleDeleteClick = (cat) => {
        setModal({ type: "delete", data: cat });
    };
    const handleConfirm = async () => {
        await deleteCategory(modal.data._id);
        !error && setModal({ type: null, data: null });
    };

    return (
        <Table headers={headers}>
            {categories.map((cat) => (
                <tr
                    key={cat._id}
                    className='hover:bg-gray-50'>
                    <td className='whitespace-nowrap px-4 py-3'>
                        <ProductImage
                            size='w-16 h-16'
                            src={cat.image}
                        />
                    </td>
                    <td className='whitespace-nowrap px-4 py-3 font-semibold'>{cat.name}</td>
                    <td className='whitespace-nowrap px-4 py-3'>{cat.slug}</td>
                    <td className='whitespace-nowrap px-4 py-3 text-center'>
                        <div className='flex items-center justify-center gap-4'>
                            <ToggleSwitch
                                toggle={() => handleStatusToggle(cat._id, cat.isActive)}
                                status={cat.isActive}
                                statusText={cat.isActive ? "Active" : "Inactive"}
                            />
                        </div>
                    </td>
                    <td className='whitespace-nowrap px-4 py-3 sticky right-0 bg-white shadow-[-8px_0_10px_-4px_#00000025]'>
                        <div className='flex justify-center gap-2'>
                            <Button onClick={() => navigate(`/admin/products/edit/${p._id}`, { state: p })}>
                                <Pencil size={16} />
                            </Button>
                            <Button onClick={() => handleDeleteClick(p)}>
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </td>
                </tr>
            ))}
        </Table>
    );
};

export default CategoriesTable;
