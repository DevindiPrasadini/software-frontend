import { useState } from "react"

export default  function ImageSlideShow(props){
    const [activeImg, setActiveImg] = useState(0)
    const images = props.images || []
    return(
       <div className="w-[500px] lg:h-[600px] bg-gray-300 flex flex-col">
        <img className="w-full aspect-square object-cover" src={images[activeImg]}/>
        <div className="h-[100px] w-full gap-2  flex items-center justify-center">
            {
                images.map(
                    (item , index)=>{
                        return(
                            <img className={"w-[90px] h-[90px] cursor-pointer rounded-xl " +(index==activeImg ? "border-4 border-gray-400": "")}
                            onClick={
                                ()=>{
                                    setActiveImg(index)
                                }
                            } src={item} key={index}/>
                        )
                    }
                )
            }
        </div>
       </div>

    )
}