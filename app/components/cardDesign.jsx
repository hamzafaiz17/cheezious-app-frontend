import AddtoCartBtn from "../(public)/menu/addtocart";

export default function ProductCard({
  image,
  name,
  description,
  price,
  addtocart,
  item,
}) {
  return (
    <>
      <div className="rounded-sm shadow-sm overflow-hidden bg-white ProductCard">
        <div>
          <div style={{ width: "100%", height: "350px", objectFit: "cover" }}>
            <img
              src={image}
              className="w-full object-cover ProductImage pro-img"
              alt=""
            />
          </div>
        </div>
        <div className="p-4 ProdcutBody">
          <h2 className="text-lg font-bold ProductTitle product-title">
            {name}
          </h2>
          <p className="text-sm text-gray-600 mt-1 ProductDesc">
            {description}
          </p>

          <div className="mt-4 price">
            <div className="flex items-center justify-between">
              <div className="text-orange-600 font-bold text-xl">
                RS. {price}
              </div>
              <div>
                <span className="py-1 px-2 rounded-full text-white bg-orange-600 font-[Montserrat] text-xs">
                  Starting Price
                </span>
              </div>
            </div>

            <AddtoCartBtn addtocart={addtocart} item={item} />
          </div>
        </div>
      </div>
    </>
  );
}
