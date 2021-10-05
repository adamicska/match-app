const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

export default function Players() {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full flex justify-center items-center">
                <div className="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white">
                  <div className="relative mb-6">
                    <img
                      className="w-full"
                      src="https://source.unsplash.com/6D2Lmtv_X8A"
                      alt="Profile picture"
                    />
                    <div className="text-center absolute w-full">
                      <div className="mb-10">
                        <p className="text-white tracking-wide uppercase text-lg font-bold">
                          {product.name}
                        </p>
                        <p className="text-yellow-400 text-sm">@sarasa</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-10 px-6 text-center tracking-wide grid grid-cols-3 gap-6">
                    <div className="posts">
                      <p className="text-lg">24</p>
                      <p className="text-gray-400 text-sm">Age</p>
                    </div>
                    <div className="followers">
                      <p className="text-lg">4.5</p>
                      <p className="text-gray-400 text-sm">Level</p>
                    </div>
                    <div className="following">
                      <p className="text-lg">8-20hrs</p>
                      <p className="text-gray-400 text-sm">Available</p>
                    </div>
                  </div>
                  <button
                    href="#"
                    className="mx-auto mb-2 flex items-center justify-center px-6 py-1 border border-transparent text-base font-small rounded-md text-white bg-yellow-600 hover:bg-yellow-700 md:py-4 md:text-lg md:px-10"
                  >
                    Add Friend
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
