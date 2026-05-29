import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { TbTrash } from "react-icons/tb"

export default function ProductDeleteModal(props){

  const [ isModelOpen , setIsModelOpen] = useState(false)
    const product = props.product
    const refresh = props.refresh
    function handleDelete(){
       () => {
                            //toast.success(item.productId)
                            const token = localStorage.getItem("token")
                            axios.delete(import.meta.env.VITE_API_URL + "/products/" + product.productId, {
                              headers: {
                                "Authorization": "Bearer " + token
                              }
                            }).then(
                              () => {
                                toast.success("product deleted successfully")
                                refresh()
                              }
                            ).catch(
                              (error) => {
                                toast.error("failed to delete product")
                              }
                            )
                          }
    }

    return(
      <>
        <TbTrash className="text-2xl text-red-500 hover:text-red-300"
        onClick={
          ()=>{
            setIsModelOpen(true)
          }
        }/>
      
      {
        isModelOpen&&
        <div className="w-screen h-screen fixed bg-black/30 top-0 left-0 flex justify-center items-center">
          <div className="w-[500px] h-[200px] bg-white flex flex-col justify-center items-center rounded-lg p-4">
            <h1 className="text-xl font-bold mb-4">Are you syre you want to delete product with id {product.productId}</h1>
           <div className="flex gap-4">
             <button className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
            onClick={
              ()=>{
                handleDelete()
                setIsModelOpen(false)
              }
            }>
              Delete 
              </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-800 "
            onClick={
              ()=>{
                setIsModelOpen(false)
              }
            }>
              Cancel 
        
              </button>
           </div>
            
          </div>

      
        
        </div>
      }
      </>
                        
    )
}