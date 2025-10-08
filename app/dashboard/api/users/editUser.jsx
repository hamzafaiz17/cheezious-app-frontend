import axios from "axios";
export default function EditUserDetails(
  apiEndpoint,
  editUser,
  users,
  setUsers,
  userId,
  { setLoading, onSuccess }
) {
  setLoading(true);
  const formData = new FormData();
  formData.append("name", editUser.name);
  formData.append("email", editUser.email);
  formData.append("role", editUser.role);
  formData.append("status", editUser.status);
  formData.append("dateOfBirth", editUser.dateOfBirth);

  if (editUser.profilepic && typeof editUser.profilepic !== "string") {
    formData.append("file", editUser.profilepic);
  }

  axios
    .put(apiEndpoint, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(function (response) {
      let updatedlist = users.map((u) =>
        u._id === userId ? response.data.data : u
      );
      setUsers(updatedlist);
      console.log(response);
      onSuccess();
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
    });
}
