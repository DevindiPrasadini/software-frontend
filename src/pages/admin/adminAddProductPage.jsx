import axios from "axios"
import { use, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function AdminAddProductPage(){

    const [productId, setProductId]=useState("")
    const [name, setName]=useState("")
    const [altNames, setAltNames]=useState("")
    const [price, setPrice]=useState("")
    const [labelPrice, setLabelPrice]=useState("")
    const [description, setDescription]=useState("")
    const [images, setImages]=useState([])
    const [brand, setBrand]=useState("")
    const [model, setModel]=useState("")
    const [category, setCategory]=useState("")
    const [isAvailable, setIsAvailable]=useState(true)
    const [stock, setStock]=useState(0)
    //const [description, setDescription]=useState("")
    const navigate = useNavigate();
    
    async function handleSave(){
        try{
            
            const token = localStorage.getItem("token");
            if(token == null){
                toast.error("you must be logged in to perform this action");
                window.location.href = "/login";
                return;
                //upload images
                 }
                 const mediaUploadPromises = []
                 for(let i=0; i<images ; i++){
                    mediaUploadPromises.push(uploadMedia(images[i]));
                 }
                 const urls = await Promise.all(mediaUploadPromises);//get all prmises into one array

                 const altNamesArray = altNames.split(",")

                 const productDate ={
                    productId : productId,
                    name :name,
                    altNames :altNames,
                    price:price,
                    labelPrice:labelPrice,
                    description:description,
                    images:images,
                    brand:brand,
                    model:model,
                    category:category,
                    isAvailable:isAvailable,
                    stock:stock
                 }

                 const response = await axios.post(import.meta.env.VITE_API_URL+"/products",productDate,
                    {
                        headers : {
                            "Authorization" : "Bearer "+token
                        }
                    }
                 )
                 toast.success("product added successfully");
                 navigate("/admin/products");

        }catch(error){
            console.log("error",error);
            toast.error(error?.response?.data?.message || "failed to add product");
        }

    }

    return(
        <div className="w-full h-full flex flex-col items-center p-4 overflow-y-scroll">
            <div className="sticky top-0 w-full h-[100px] rounded-lg bg-red-300 text-white flex items-center justify-between p-5 ">
                <h1  className="text-2xl font-semibold ">Add new product</h1>
                <div className="h-full flex justify-center items-center">
                    <button onClick={handleSave}className=" px-4 py-2 bg-green-300 text-white rounded-lg hover:bg-green-300">Save</button>
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
                     onChange={(e)=>{setLabelPrice(e.target.value)}}/>
                </div>
                <div className="w-1/4 p-2">
                <label className="block mb-2 font-semibold">Category</label>
                 <select className="border border-gray-300 rounded-lg p-2 w-full">
                    <option value="lap">lap</option>
                    <option value="phone">phone</option>
                </select>
                </div>
                <div className="w-1/4 p-2" >
                    {/* images */}
                    <label className="block mb-2 font-semibold">Images</label>
                    <input type="file" multiple className="border-2"
                    onChange={(e)=>{
                        setImages(e.target.files)
                    }
                    }/>
                </div>
                 <div className="w-1/4 p-2">
                <label className="block mb-2 font-semibold">Description</label>
                 <textarea className="border border-gray-300 rounded-md p-2 w-full"
                    value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}>
                 </textarea>
                </div>
                <div className="w-1/4 p-2">
                <label className="block mb-2 font-semibold">Brand</label>
                <select value={brand}
                onChange={(e)=>{setBrand(e.target.value)}}
                className="border border-gray-300 rounded-md">
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                </select>
                </div>
                 <div className="w-1/4 p-2">
                <label className="block mb-2 font-semibold">Model</label>
                 <input className="border border-gray-300 rounded-md p-2 w-full"
                    value={model}
                    onChange={(e)=>{setModel(e.target.value)}}>
                 </input>
                </div>
                 <div className="w-1/4 p-2">
                <label className="block mb-2 font-semibold">Stock</label>
                 <input className="border border-gray-300 rounded-md p-2 w-full"
                    value={stock}
                    onChange={(e)=>{setStock(e.target.value)}}>
                 </input>
                </div>
                 <div className="w-1/4 p-2">
                <label className="block mb-2 font-semibold">Availability</label>
                <select value={isAvailable}
                onChange={(e)=>{
                    setIsAvailable(e.target.value === "true");
                }} className="border border-gray-300 rounded-md p-2 w-full">
                <option value={true}>Available</option>
                <option value={false}>Not available</option>
                </select>
                </div>
               

            </div>
            
            
        </div>
    )
}                                       