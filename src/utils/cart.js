export  default function getCart(){
    const cartString = localStorage.getItem("cart");

    if(cartString == null){
        localStorage.setItem("cart", "[]")
        return []
    }else{
        const cart = JSON.parse(cartString)
        return cart
    }
}

export function addToCart(product ,  quantity){
    
    const cart = getCart()

    const existingProductIndex = cart.findIndex(
        (item)=>{
            return item.product.productId == product.productId
        }
    )// if not found on cart -1

    if (existingProductIndex == -1){
        if (quantity > 0){
            cart.push(
                {
                    product : {
                        productId : product.productId,
                        name : product.name,
                        image : product.images[0],
                        labelledPrice : product.labelledPrice,
                        price : product.price,
                    },
                    quantity : quantity
                }
            )
        }
    }else{
        const newQty = cart[existingProductIndex].quantity + quantity;
        if(quantity > 0){
            cart[existingProductIndex].quantity = newQty
        }else{
            cart.splice(existingProductIndex , 1)
        }
    }
    const cartString = JSON.stringify(cart)

    localStorage.setItem("cart" , cartString)

}