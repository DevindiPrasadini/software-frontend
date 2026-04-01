export default function ProductCard({ name, image, price }) {
  console.log(name);
  console.log("product card is being rendered");

  return (
    <div className="w-64 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      
      {/* Image */}
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={`Picture of ${name}`}
          className="h-full object-contain p-4"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h1 className="text-lg font-semibold text- truncate">
          {name}
        </h1>

        <p className="text-xl font-bold text-green-600 mt-2">
          LKR {price}
        </p>

        {/* Button */}
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl font-medium hover:bg-blue-600 active:scale-95 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
}