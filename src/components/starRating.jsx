export default function StarRating({ rating, onChange =()=>{}, readOnly = false }) {
    const stars = [1, 2, 3, 4, 5]

    return (
        <div className="flex gap-1">
            {stars.map((star) => (
                <span
                    key={star}
                    onClick={() => !readOnly && onChange(star)}
                    className={`text-2xl ${readOnly ? "" : "cursor-pointer"} ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                >
                    ★
                </span>
            ))}
        </div>
    )
}