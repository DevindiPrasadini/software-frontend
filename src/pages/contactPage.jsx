import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

export default function ContactPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit() {
        if (!name || !email || !subject || !message) {
            toast.error("Please fill in all fields")
            return
        }

        setIsSubmitting(true)
        try {
            await axios.post(import.meta.env.VITE_API_URL + "/contact", {
                name,
                email,
                subject,
                message
            })
            toast.success("Your query has been sent successfully")
            setName("")
            setEmail("")
            setSubject("")
            setMessage("")
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to send your query")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className=" bg-gray-50 py-10 mb-10 lg:mb-0 px-4 lg:py-16">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-center">Contact Us</h1>
                <p className="text-gray-500 text-center mb-10">
                    We'd love to hear from you. Reach out with any questions or feedback.
                </p>

                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Store info */}
                    <div className="bg-white rounded-2xl shadow-sm border p-6 lg:p-8 space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800">iComputer Store</h2>

                        <div className="flex items-start gap-4">
                            <FaPhoneAlt className="text-accent mt-1 shrink-0" />
                            <div>
                                <p className="font-medium text-gray-800">Phone</p>
                                <p className="text-gray-500 text-sm">+94 77 123 4567</p>
                                <p className="text-gray-500 text-sm">+94 11 234 5678</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-accent mt-1 shrink-0" />
                            <div>
                                <p className="font-medium text-gray-800">Email</p>
                                <p className="text-gray-500 text-sm">support@icomputerstore.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="text-accent mt-1 shrink-0" />
                            <div>
                                <p className="font-medium text-gray-800">Branch Address</p>
                                <p className="text-gray-500 text-sm">
                                    No. 45, Galle Road, Colombo 03, Sri Lanka
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <p className="font-medium text-gray-800 mb-1">Store Hours</p>
                            <p className="text-gray-500 text-sm">Mon – Sat: 9:00 AM – 7:00 PM</p>
                            <p className="text-gray-500 text-sm">Sunday: Closed</p>
                        </div>
                    </div>

                    {/* Query form */}
                    <div className="bg-white rounded-2xl shadow-sm border p-6 lg:p-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">Send us a query</h2>

                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <textarea
                                placeholder="Your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={5}
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full py-3 bg-accent text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
                            >
                                {isSubmitting ? "Sending..." : "Send Query"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}