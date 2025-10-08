import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditUserDetails from "../../api/users/editUser";

export default function EditUserCom({ userId, users, setUsers }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // Find the user object by userId
  const userObj = users?.find((u) => u._id === userId) || {};
  // Local state for editing user fields
  const [editUser, setEditUser] = useState({
    name: userObj.name || "",
    email: userObj.email || "",
    role: userObj.role || "",
    status: userObj.status || "",
    dateOfBirth: userObj.dateOfBirth ? userObj.dateOfBirth : "",
    profilepic: userObj.profilepic || "",
  });
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Update local state if user changes
    setEditUser({
      name: userObj.name || "",
      email: userObj.email || "",
      role: userObj.role || "",
      status: userObj.status || "",
      dateOfBirth: userObj.dateOfBirth ? userObj.dateOfBirth : "",
      profilepic: userObj.profilepic || "",
    });
  }, [userId, users]);

  let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  let apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
  let apiEndpoint = baseURL + apiVersion + "auth/user-update/" + userId;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setEditUser((prev) => ({ ...prev, profilepic: file }));
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            "py-1 px-2 bg-transparent hover:bg-transparent hover:no-underline underline  underline-offset-[2px] decoration-[1.5px] font-bold uppercase cursor-pointer"
          }
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User Detail</DialogTitle>
          <DialogDescription>
            Make sure All Required Fields are Filled
          </DialogDescription>
        </DialogHeader>
        <form encType="multipart/form-data">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div
                onClick={handleClick}
                className="w-32 h-32 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="object-cover w-full h-full"
                  />
                ) : editUser.profilepic &&
                  typeof editUser.profilepic === "string" ? (
                  <img
                    src={editUser.profilepic}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Click to select</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                className="col-span-3"
                name="name"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3 flex gap-2 items-center">
                <Input
                  name="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  disabled={emailDisabled}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEmailDisabled((prev) => !prev)}
                >
                  {emailDisabled ? "Enable" : "Disable"}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={editUser.role}
                onValueChange={(value) =>
                  setEditUser((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger className="sm:w-[100%] md:w-[250px]">
                  <SelectValue placeholder="-- Role --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="subscriber">Subscriber</SelectItem>
                    <SelectItem value="auther">Auther</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={editUser.status}
                onValueChange={(value) =>
                  setEditUser((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="sm:w-[100%] md:w-[250px]">
                  <SelectValue placeholder="-- Status --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfBirth" className="text-right">
                Date of Birth
              </Label>
              <Input
                className="col-span-3"
                name="dateOfBirth"
                type="date"
                value={editUser.dateOfBirth.slice(0, 10)}
                onChange={(e) =>
                  setEditUser((prev) => ({
                    ...prev,
                    dateOfBirth: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="py-3 px-4 font-bold uppercase cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                EditUserDetails(
                  apiEndpoint,
                  editUser,
                  users,
                  setUsers,
                  userId,
                  {
                    setLoading,
                    onSuccess: () => setOpen(false),
                  }
                );
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              ) : (
                "Update User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
