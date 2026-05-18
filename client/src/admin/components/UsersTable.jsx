import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Edit, Eye, RotateCcw, ShieldPlus, Trash2, UserRound } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import { Button } from "../../shared/ui/Button";
import ToggleSwitch from "../../shared/ui/ToggleSwitch";
import FormField from "../../shared/ui/FormField";

import useUserAdminStore from "../store/useAdminUserStore";
import SelectField from "../../shared/ui/SelectField";
import Table from "./Table";

const UsersTable = ({ users, role }) => {
    const navigate = useNavigate();
    const { user: LoggedInUser } = useContext(AuthContext);
    const { updateUserStatus, fetchUsers } = useUserAdminStore();

    const { register } = useForm({ defaultValues: { role: "admin" } });

    const isStaff = role === "admin";
    const currentUserStatus = (user) => {
        return LoggedInUser._id === user._id || user.status === "deleted";
    };

    const headers = [
        { label: "Name & Email" },
        { label: "Joined At", className: "text-center" },
        { label: isStaff ? "Role" : "Orders", className: "text-center" },
        { label: "Status", className: "text-center" },
        { label: "Actions", className: "text-center sticky right-0 bg-gray-300 shadow-[-8px_0_10px_-4px_#00000025]" },
    ];
    const handleRoleChange = async (user, newRole) => {
        if (user.role === newRole) return;
        const confirm = window.confirm(`Change role to ${newRole}?`);
        if (!confirm) return;
        await updateUserStatus(user._id, { role: newRole });
    };
    const handleStatusToggle = async (user) => {
        const newStatus = user.status === "active" ? "blocked" : "active";
        await updateUserStatus(user._id, { status: newStatus });
    };
    const handleRestore = async (id) => {
        const confirm = window.confirm(`Are you sure? You want to revoke the ${user.name}.`);
        if (!confirm) return;
        await updateUserStatus(id, { staus: "active" });
    };
    const handlePromote = async (user) => {
        const confirm = window.confirm(`Make ${user.name} an admin?`);
        if (!confirm) return;
        await updateUserStatus(user._id, { role: "admin" });
    };

    const filteredUsers = users.filter((user) => user.role === role);

    return (
        <Table headers={headers}>
            {filteredUsers.map((user) => (
                <tr
                    key={user._id}
                    className='hover:bg-gray-50'>
                    <td className='px-4 py-3 max-w-65whitespace-nowrap'>
                        <div className='flex items-center min-w-0 gap-3'>
                            <div className='items-center justify-center hidden w-10 h-10 text-sm font-semibold text-white bg-green-500 rounded-full shadow-sm md:flex shrink-0'>{user.name?.[0]}</div>
                            <div className='flex flex-col min-w-0 leading-tight'>
                                <span className='font-medium text-gray-800 truncate'>{user.name}</span>
                                <span className='text-gray-600 truncate text-x'>{user.email}</span>
                            </div>
                        </div>
                    </td>
                    <td className='px-4 py-3 text-center whitespace-nowrap'>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</td>
                    {isStaff ? (
                        <td className='px-6 py-4'>
                            <select
                                {...register("role")}
                                defaultValue={user.role}
                                disabled={currentUserStatus(user)}
                                onChange={(e) => handleRoleChange(user, e.target.value)}
                                className='px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:opacity-70'>
                                <option value='user'>User</option>
                                <option value='admin'>Admin</option>
                            </select>
                        </td>
                    ) : (
                        <td className='px-6 py-4 font-medium text-center whitespace-nowrap'>{user.orders?.length || 0}</td>
                    )}

                    <td className='px-4 py-3 text-center whitespace-nowrap'>
                        <div className='flex items-center justify-center gap-4'>
                            <ToggleSwitch
                                disabled={currentUserStatus(user)}
                                toggle={() => handleStatusToggle(user)}
                                status={user.status === "active"}
                                statusText={user.status === "active" ? "Active" : user.status === "blocked" ? "Blocked" : "Deleted"}
                            />
                        </div>
                    </td>

                    <td className='px-4 py-3 sticky right-0 bg-white whitespace-nowrap shadow-[-8px_0_10px_-4px_#00000025]'>
                        <div className='flex justify-center gap-2'>
                            <Button
                                size='xs'
                                onClick={() => navigate(`/admin/${isStaff ? "staff" : "customer"}/${user._id}`)}
                                className='hover:text-green-600 hover:scale-125'>
                                <Eye size={18} />
                            </Button>
                            {user.status === "deleted" ? (
                                <Button
                                    size='xs'
                                    onClick={() => handleRestore(user._id)}
                                    className='hover:text-blue-600 hover:scale-125'>
                                    <RotateCcw size={18} />
                                </Button>
                            ) : (
                                <Button
                                    size='xs'
                                    onClick={() => setOpenModal(true)}
                                    className='hover:text-red-600 hover:scale-125'>
                                    <Trash2 size={18} />
                                </Button>
                            )}
                            <Button
                                size='xs'
                                disabled={user.status !== "active"}
                                onClick={() => handlePromote(user)}
                                className='hover:text-indigo-600 hover:scale-125'>
                                <ShieldPlus size={18} />
                            </Button>
                        </div>
                    </td>
                </tr>
            ))}
        </Table>
    );
};

export default UsersTable;
