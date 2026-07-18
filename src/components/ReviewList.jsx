import { useState } from "react"
import toast from "react-hot-toast"
import api from "../utils/api"
import StarRating from "./StarRating"

export default function ReviewList({ reviews, loading, isAdmin = false, onReviewDeleted, onReviewUpdated }) {
    const [editingId, setEditingId] = useState(null)
    const [editRating, setEditRating] = useState(0)
    const [editComment, setEditComment] = useState("")
    const [editIsAnonymous, setEditIsAnonymous] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    function startEdit(review) {
        setEditingId(review._id)
        setEditRating(review.rating)
        setEditComment(review.comment || "")
        setEditIsAnonymous(review.isAnonymous || false)
    }

    function cancelEdit() {
        setEditingId(null)
    }

    async function saveEdit(reviewId) {
        if (editRating === 0) {
            toast.error("Please select a star rating")
            return
        }
        setIsSaving(true)
        const token = localStorage.getItem("token")
        try {
            await api.put(`/reviews/${reviewId}`, {
                rating: editRating,
                comment: editComment,
                isAnonymous: editIsAnonymous
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("Review updated")
            setEditingId(null)
            if (onReviewUpdated) await onReviewUpdated()
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to update review")
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(reviewId) {
        const token = localStorage.getItem("token")
        try {
            await api.delete(`/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Review deleted")
            if (onReviewDeleted) {
                await onReviewDeleted()
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to delete review")
        }
    }

    if (loading) return <p className="text-gray-500">Loading reviews...</p>

    if (reviews.length === 0) {
        return <p className="text-gray-500">No reviews yet. Be the first to review!</p>
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => {
                const canManage = review.isOwn || isAdmin
                const isEditing = editingId === review._id

                return (
                    <div key={review._id} className="bg-white rounded-2xl shadow p-5">
                        {isEditing ? (
                            <div className="flex flex-col gap-3">
                                <StarRating rating={editRating} onChange={setEditRating} />
                                <textarea
                                    value={editComment}
                                    onChange={(e) => setEditComment(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                                    rows={3}
                                />
                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        checked={editIsAnonymous}
                                        onChange={(e) => setEditIsAnonymous(e.target.checked)}
                                    />
                                    Post anonymously
                                </label>
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={cancelEdit}
                                        className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => saveEdit(review._id)}
                                        disabled={isSaving}
                                        className="text-sm px-3 py-1.5 rounded-lg bg-accent text-white hover:opacity-90 disabled:opacity-50"
                                    >
                                        {isSaving ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {review.userName}
                                            {review.isOwn && (
                                                <span className="ml-2 text-xs text-accent font-normal">(You)</span>
                                            )}
                                        </p>
                                        <StarRating rating={review.rating} onChange={() => {}} readOnly />
                                    </div>
                                    {canManage && (
                                        <div className="flex gap-3">
                                            {review.isOwn && (
                                                <button
                                                    onClick={() => startEdit(review)}
                                                    className="text-sm text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="text-sm text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {review.comment && (
                                    <p className="text-gray-600 mt-2">{review.comment}</p>
                                )}
                                <p className="text-xs text-gray-400 mt-2">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}