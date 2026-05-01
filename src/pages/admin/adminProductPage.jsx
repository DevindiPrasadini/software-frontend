import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa";

export default function AdminProductPage() {
    return (
        <div className="w-full h-full">

            <Link to="/admin/add-product" className="fixed bottom-8 right-8 w-[60px] h-[60px] bg-accent flex justify-center items-center text-white text-3xl rounded-full shadow-lg hover:bg-black hover:text-purple-400">
                <FaPlus />
            </Link>
        </div>
    )
}