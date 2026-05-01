import { use, useState } from "react"

export default function AdminAddProductPage(){

    const [productId, setProductId]=useState("")
    const [name, setName]=useState("")
    const [altNames, setAltNames]=useState("")
    const [price, setPrice]=useState("")
    const [labelPrice, setLabelPrice]=useState("")
    const [images, setImages]=useState([])
    const [brand, setBrand]=useState("")
    const [model, setModel]=useState("")
    const [category, setCategory]=useState("")
    const [isAvailable, setIsAvailable]=useState(true)
    const [stock, setStock]=useState(0)
    //const [description, setDescription]=useState("")
    return(
        <div className="w-full h-full flex flex-col items-center p-4">
            <div className="w-full h-[100px] rounded-lg bg-red-300 text-white flex items-center justify-between p-5">
                <h1  className="text-2xl font-semibold ">Add new product</h1>
                <div className="h-full flex justify-center items-center">
                    <button className=" px-4 py-2 bg-green-300 text-white rounded-lg hover:bg-green-300">Save</button>
                    <button className=" px-4 py-2 bg-red-600 text-white   rounded-lg hover:bg-red-600" >Cancel</button>
                </div>
            </div>
            <div className="w-full flex flex-wrap bg-white mt-8 p-5 shadow-2xl rounded-lg ">
                <div className="w-1/4 p-2 ">
                    <label className="block mb-2 font-semibold">Product Id</label>
                    <input className="border border-gray-300 rounded-lg p-2"
                     value={productId}
                     onChange={(e)=>setProductId(e.target.value)}
                     />
                </div>
                <div className="w-3/4 p-2">
                    <label className="block mb-2 font-semibold">Name</label>
                    <input className="border border-gray-300 rounded-lg p-2 w-full"
                     value={name}
                     onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="w-full p-2">
                    <label className="block mb-2 font-semibold">Alterative names</label>
                    <input className="border border-gray-300 rounded-lg p-2 w-full"
                     value={altNames}
                     onChange={(e)=>setAltNames(e.target.value)}/>
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Price</label>
                    <input className="border border-gray-300 rounded-lg p-2 w-full"
                     value={price}
                     onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Label price</label>
                    <input className="border border-gray-300 rounded-lg p-2 w-full"
                     value={labelPrice}
                     onChange={(e)=>setLabelPrice(e.target.value)}/>
                </div>
                <div className="w-1/4 p-2">
                <label className="block mb-2 font-semibold">Category</label>
                 <select className="border border-gray-300 rounded-lg p-2 w-full">
                    <option value="lap">lap</option>
                    <option value="phone">phone</option>
                </select>
                </div>
               

            </div>
            
            
        </div>
    )
}                                       