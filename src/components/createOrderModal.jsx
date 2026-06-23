import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function CreateOrderModal(props) {
    /*firstName :user.firstName,
        lastName : user.lastName,
        addressLineOne : req.body.addressLineOne,
        addressLineTwo : req.body.addressLineTwo,
        city : req.body.city,
        state :req.body.state,
        postalCode : req.body.postalCode,
        phone : req.body.phone, */

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [addressLineOne, setAddressLineOne] = useState("")
    const [addressLineTwo, setAddressLineTwo] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phone, setPhone] = useState("")
    const cart = props.cart;

    async function createOrder(){
        try{
            const token = localStorage.getItem("token")

            const data ={
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phone,
                items : []
            }

            for (let i=0; i<cart.length; i++){
                const item = cart[i]
                data.items.push(
                    {
                        productId : item.product.productId,
                        quantity : item.quantity
                    }
                )
            }

            await api.post("/orders",data,{
                headers : {
                    Authorization: "Bearer " + token
                }
            })

            toast.success("order created successfully!")
            setIsModalOpen(false)

        }catch(error){
            toast.error(error?.response?.data?.message || "An error occured while creating the order.")
        }
    }



    return (
        <>
            <button className="bg-accent text-white px-4 py-2 rounded-lg font-semibold" onClick={() => setIsModalOpen(true)}>Order Now</button>
            {
                isModalOpen &&
                <div className="fixed bg-black/70 w-screen h-screen top-0 left-0">
                    <div className="w-[400px] bg-white rounded-lg p-5 flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">Shipping Details</h1>
                        <input type="text" placeholder="First Name" className="w-full border p-2 rounded" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" placeholder="Last Name" className="w-full border p-2 rounded" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <input type="text" placeholder="Address Line 1" className="w-full border p-2 rounded" value={addressLineOne} onChange={(e) => setAddressLineOne(e.target.value)} />
                        <input type="text" placeholder="Address Line 2" className="w-full border p-2 rounded" value={addressLineTwo} onChange={(e) => setAddressLineTwo(e.target.value)} />
                        <input type="text" placeholder="City" className="w-full border p-2 rounded" value={city} onChange={(e) => setCity(e.target.value)} />
                        <input type="text" placeholder="State" className="w-full border p-2 rounded" value={state} onChange={(e) => setState(e.target.value)} />
                        <input type="text" placeholder="Postal Code" className="w-full border p-2 rounded" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        <input type="text" placeholder="Phone" className="w-full border p-2 rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <div className="w-full flex flex-row justify-between items-center">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold" onClick={createOrder}
                            >Place Order</button>

                        </div>

                    </div>
                </div>
            }
        </>
    )
}