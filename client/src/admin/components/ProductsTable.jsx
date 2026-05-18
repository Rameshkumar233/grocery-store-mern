import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import Table from "./Table";
import Modal from "../../shared/ui/Modal";
import ToggleSwitch from "../../shared/ui/ToggleSwitch";
import ProductImage from "../../shared/ui/ProductImage";
import useAdminProductStore from "../store/useAdminProductStore";

const ProductsTable = ({ products }) => {
    const { deleteProduct, updateProductStatus } = useAdminProductStore();
    const navigate = useNavigate();
    const [modal, setModal] = useState(null);

    const headers = [
        { label: "Image" },
        { label: "Name" },
        { label: "Category" },
        { label: "Price", className: "text-center" },
        { label: "Offer (%)", className: "text-center" },
        { label: "Offer Price", className: "text-center" },
        { label: "Stock", className: "text-center" },
        { label: "Status", className: "text-center" },
        { label: "Actions", className: "text-center sticky right-0 bg-gray-300 shadow-[-8px_0_10px_-4px_#00000025]" },
    ];
    const offerPrice = (product) => {
        return Math.floor(product.price - (product.price * product.offerPercent) / 100);
    };
    const handleStatusToggle = async (id, status) => {
        const newStatus = !status;
        await updateProductStatus(id, newStatus);
    };

    const handleDeleteClick = (product) => {
        setModal({
            title: "Delete Product",
            message: (
                <>
                    Are you sure you want to delete
                    <span className='font-semibold'> {product.name}</span>?
                </>
            ),
            actionText: "Delete",
            onAction: async () => await deleteProduct(product._id),
        });
    };

    return (
        <>
            <Table headers={headers}>
                {products.map((p) => (
                    <tr
                        key={p._id}
                        className='hover:bg-gray-50'>
                        <td className='whitespace-nowrap px-4 py-3'>
                            <ProductImage
                                size='w-16 h-16'
                                src={p.image}
                            />
                        </td>
                        <td className='whitespace-nowrap px-4 py-3 font-semibold'>{p.name}</td>
                        <td className='whitespace-nowrap px-4 py-3'>{p.category?.name}</td>
                        <td className='whitespace-nowrap px-4 py-3 text-center font-semibold'>₹{p.price}</td>
                        <td className='whitespace-nowrap px-4 py-3 text-center font-medium'>{p.offerPercent}</td>
                        <td className='whitespace-nowrap px-4 py-3 text-center font-bold'>₹{offerPrice(p)}</td>
                        <td className={`whitespace-nowrap px-4 py-3 text-center  ${p.stock < 10 ? "text-red-500 font-bold" : "font-semibold"}`}>{p.stock}</td>
                        <td className='whitespace-nowrap px-4 py-3 text-center '>
                            <div className='flex items-center justify-center gap-4'>
                                <ToggleSwitch
                                    toggle={() => handleStatusToggle(p._id, p.isActive)}
                                    status={p.isActive}
                                    statusText={p.isActive ? "Active" : "Inactive"}
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
            {modal && (
                <Modal
                    title={modal.title}
                    message={modal.message}
                    actionText={modal.actionText}
                    handleAction={() => {
                        modal.onAction();
                        setModal(null);
                    }}
                    onClose={() => setModal(null)}
                />
            )}
        </>
    );
};

export default ProductsTable;
