import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../../utils/api"

export default function AdminUsersPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        setLoading(true)
        const token = localStorage.getItem("token")
        try {
            const res = await api.get("/users", {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUsers(res.data)
        } catch (error) {
            console.log(error)
            toast.error("Failed to load users")
        } finally {
            setLoading(false)
        }
    }

    async function handleToggleAdmin(email) {
        const token = localStorage.getItem("token")
        try {
            await api.put(`/users/${email}/toggle-admin`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("Admin status updated")
            fetchUsers()
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to update admin status")
        }
    }

    async function handleToggleBlock(email) {
        const token = localStorage.getItem("token")
        try {
            await api.put(`/users/${email}/toggle-block`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("Block status updated")
            fetchUsers()
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to update block status")
        }
    }

    async function handleDelete(email) {
        if (!window.confirm(`Delete user ${email}? This cannot be undone.`)) return

        const token = localStorage.getItem("token")
        try {
            await api.delete(`/users/${email}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("User deleted")
            fetchUsers()
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to delete user")
        }
    }

    const filteredUsers = users.filter((u) => {
        const q = search.toLowerCase()
        return (
            u.email.toLowerCase().includes(q) ||
            u.firstName.toLowerCase().includes(q) ||
            u.lastName.toLowerCase().includes(q)
        )
    })

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md mb-6 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />

                {loading ? (
                    <p className="text-gray-500">Loading users...</p>
                ) : filteredUsers.length === 0 ? (
                    <p className="text-gray-500">No users found.</p>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50 text-left text-gray-500">
                                    <th className="p-4">User</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Admin</th>
                                    <th className="p-4">Blocked</th>
                                    <th className="p-4">Verified</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((u) => (
                                    <tr key={u.email} className="border-b last:border-0">
                                        <td className="p-4 flex items-center gap-3">
                                            <img
                                                src={u.image}
                                                alt={u.firstName}
                                                className="w-9 h-9 rounded-full object-cover bg-gray-100"
                                            />
                                            <span className="font-medium text-gray-800">
                                                {u.firstName} {u.lastName}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500">{u.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                u.isAdmin ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                                            }`}>
                                                {u.isAdmin ? "Admin" : "User"}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                u.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                            }`}>
                                                {u.isBlocked ? "Blocked" : "Active"}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                u.isEmailVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                                {u.isEmailVerified ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2 flex-wrap">
                                                <button
                                                    onClick={() => handleToggleAdmin(u.email)}
                                                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium"
                                                >
                                                    {u.isAdmin ? "Remove Admin" : "Make Admin"}
                                                </button>
                                                <button
                                                    onClick={() => handleToggleBlock(u.email)}
                                                    className="text-xs px-3 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 font-medium"
                                                >
                                                    {u.isBlocked ? "Unblock" : "Block"}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(u.email)}
                                                    className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}