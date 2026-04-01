
import ProductCard from "./productCard"

export default function TrendingProducts() {
    return (
        <div>
            <h1>Trending Products</h1>
            <ProductCard name="mac book air" price="150 000" image="https://tse2.mm.bing.net/th/id/OIP.dlSkCUgkmayR6fz39LBEcwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="mac book image" />

            <ProductCard name="mac" price="100000" image="https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/article/Apple-MacBook-Pro-2up-231030_Full-Bleed-Image.jpg.large_2x.jpg" alt="mac" />

            <ProductCard name="HP" price="30000" image="https://th.bing.com/th/id/R.28552f9ae639d7d003c6b62f8b585c26?rik=L5DZbUP%2b0SQu7Q&riu=http%3a%2f%2fstore.hp.com%2fUKStore%2fHtml%2fMerch%2fImages%2fc05512731_1750x1285.jpg&ehk=v078V0Xw%2bTe2FE8UVA92%2fDUWAJ5XGaNggNTGNoYjq3g%3d&risl=&pid=ImgRaw&r=0" alt="hp image" />

        </div>
    )
}