export default function addtocartbtn({ addtocart, item }) {
  return (
    <button
      className="border-0 py-3 px-4 bg-white rounded-md w-full mt-2 font-bold cursor-pointer addtocartbtn"
      onClick={() => addtocart(item)}
    >
      {" "}
      + ADD TO CART
    </button>
  );
}
