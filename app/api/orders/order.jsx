import axios from "axios";

export default function OrderAPi(
  apiEndpoint,
  checkoutItems,
  total,
  setLoading,
  token,
  userid,
  deliveryAddress,
  diliveryNotes,
  router
) {
  setLoading(true);
  let starttime = Date.now();
  axios
    .post(
      apiEndpoint,
      {
        products: checkoutItems,
        totalPrice: total,
        status: "pending",
        deliveryAddress: deliveryAddress,
        diliveryNotes: diliveryNotes,
        userid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function (response) {
      let elapsed = Date.now() - starttime;
      let delay = 4000;

      if (elapsed < delay) {
        setTimeout(() => {
          router.push("/track-my-order/" + response.data.data._id);
          setLoading(false);
        }, delay - elapsed);
        return;
      } else {
        router.push("/track-my-order/" + response.data.data._id);
        setLoading(false);
      }
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
    });
}
