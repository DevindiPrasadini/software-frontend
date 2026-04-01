export default function ProductCard(props){

    console.log(props.name)

    console.log("product card is being rendered")
    return(
        <div>
        <h1>{props.name}</h1>
      <img src={props.image} alt={"picture of a "+props.name}/>
      <p>lkr {props.price}</p>
      <button>Buy now</button>
       </div>
    )
}