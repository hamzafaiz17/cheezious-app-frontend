import axios from "axios";
import { set } from "react-hook-form";
export default function fetchUser(
  apiEndpoint,
  user,
  setUser,
  selectedImage,
  setSelectedImage
) {
  axios
    .get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      setUser({
        ...user,
        name: response.data.data.name,
        email: response.data.data.email,
        dateOfBirth: response.data.data.dateOfBirth
          ? new Date(response.data.data.dateOfBirth).toISOString().split("T")[0]
          : "",
        profilePic: response.data.data.profilepic
          ? response.data.data.profilepic
          : "/uploads/images/default-profile.svg",
      });
      setSelectedImage(
        response.data.data.profilepic
          ? response.data.data.profilepic
          : "/uploads/images/default-profile.svg"
      );
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch((error) => {
      console.error("There was an error fetching the user data!", error);
    });
}
