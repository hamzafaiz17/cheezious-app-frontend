"use client";
import {
  AlignRightIcon,
  ShoppingCart,
  User2,
  UserRoundIcon,
  StoreIcon,
  LayoutGrid,
  PhoneCall,
  ChevronRight,
} from "lucide-react";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/app/components/cart/cartcontext";
import { AlertCircleIcon, BadgeCheckIcon, CheckIcon } from "lucide-react";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Map from "@/app/components/map";
import { useEffect, useState } from "react";
export default function HeaderS() {
  const [loginuser, setLoginUser] = useState(null);
  const [tokenExpired, setTokenExpired] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      setToken(token);
      setUser(user);

      function isJwtExpired(jwt) {
        if (!jwt) return true;
        try {
          const payloadBase64 = jwt.split(".")[1];
          const decodedPayload = JSON.parse(atob(payloadBase64));
          const expiryTime = decodedPayload.exp;
          const currentTime = Math.floor(Date.now() / 1000);
          return expiryTime < currentTime;
        } catch (error) {
          console.error("Token decode error:", error);
          return true;
        }
      }

      const expired = isJwtExpired(token);
      setTokenExpired(expired);

      if (user) {
        try {
          setLoginUser(JSON.parse(user));
        } catch (error) {
          console.error("User parse error:", error);
        }
      }
    }
  }, []);

  function Logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/auth/login");
    }
  }

  const { cart, addToCart, removeFromCart, increment, decrement } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden p-4 flex justify-between items-center bg-gray">
        {/* Left - Menu Icon */}
        <Sheet>
          <SheetTrigger>
            <AlignRightIcon
              color="#f15929"
              width={30}
              height={30}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent side="left" className="w-[400px]">
            <SheetTitle />
            <div className="flex flex-col justify-between h-full">
              <div className="top p-12">
                <div className="login">
                  <div className="flex gap-5 items-center mb-2">
                    <div
                      className={`${
                        loginuser
                          ? "rounded-full"
                          : "bg-yellow-300 p-2.5 rounded-full"
                      } `}
                    >
                      {loginuser && loginuser.profilepic !== "" ? (
                        <img
                          src={loginuser.profilepic}
                          width={50}
                          className="rounded-full"
                        />
                      ) : (
                        <UserRoundIcon size={30} />
                      )}{" "}
                    </div>

                    <div>
                      <p className="font-light">
                        {loginuser ? loginuser.name : "Login to explore"}{" "}
                      </p>
                      <p className="font-bold pt-1">
                        {loginuser ? loginuser.email : "World of flavors"}{" "}
                      </p>
                    </div>
                  </div>
                  {loginuser && !tokenExpired ? (
                    <button
                      onClick={() => Logout()}
                      className="mt-10 uppercase border hover:bg-red-500 text-black font-bold px-5 py-2 rounded-sm flex gap-2 cursor-pointer"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link href={"/auth/login"}>
                      <button className="mt-10 uppercase border hover:bg-red-500 text-black font-bold px-5 py-2 rounded-sm flex gap-2 cursor-pointer">
                        Login
                      </button>
                    </Link>
                  )}
                </div>

                <div className="bg-gray-200 my-5 h-px"></div>

                <ul>
                  <li className="font-medium py-3">
                    <Link href={"#"} className="flex gap-4 items-center">
                      <LayoutGrid size={22} />
                      Explore Menu
                    </Link>
                  </li>
                  <li className="font-medium py-3">
                    <Link href={"#"} className="flex gap-4 items-center">
                      <StoreIcon size={22} />
                      Branch Locator
                    </Link>
                  </li>
                </ul>

                <div className="bg-gray-200 my-5 h-px"></div>

                <div>
                  <Link href={"#"} className="font-medium block pb-3">
                    Blog
                  </Link>
                  <Link href={"#"} className="font-medium block">
                    Privacy Policy
                  </Link>
                </div>
              </div>

              <div className="bottom">
                <Link
                  href="tel:0000000"
                  className="py-4 px-6 flex items-center justify-between bg-[#fedc00]"
                >
                  <img src="/uploads/images/logo.ecae5615.svg" alt="" />
                  Cheezious Hotline
                  <PhoneCall />
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Center - Logo */}
        <Link href="/">
          <img
            src="/uploads/images/mainLogo.webp"
            width="120"
            alt="Logo"
            className="mx-auto"
          />
        </Link>

        {/* Right - Icons only (no text) */}
        <div className="flex gap-4 items-center">
          <ShoppingCart color="#f15929" />
          {loginuser && !tokenExpired ? (
            <Link href="/account/edit-profile">
              <User2 className="text-black" color="#f15929" />
            </Link>
          ) : (
            <Link href="/auth/login">
              <User2 className="text-black" color="#f15929" />
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex w-full">
        <div className="flex flex-row w-full">
          {/* Left Column */}
          <div className="w-1/5 bg-gray  content-center">
            <div className="flex flex-row gap-3 items-center">
              <Sheet>
                <SheetTrigger>
                  <AlignRightIcon
                    color="#f15929"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                </SheetTrigger>
                <SheetContent side="left" className="w-[400px]">
                  <SheetTitle />
                  {/* Same Drawer content as above */}
                  <div className="flex flex-col justify-between h-full">
                    <div className="top p-12">
                      <div className="login">
                        <div className="flex gap-5 items-center mb-2">
                          <div
                            className={`${
                              loginuser
                                ? "rounded-full"
                                : "bg-yellow-300 p-2.5 rounded-full"
                            } `}
                          >
                            {loginuser && loginuser.profilepic !== "" ? (
                              <img
                                src={loginuser.profilepic}
                                width={50}
                                className="rounded-full"
                              />
                            ) : (
                              <UserRoundIcon size={30} />
                            )}{" "}
                          </div>
                          <div>
                            <p className="font-light">
                              {loginuser ? loginuser.name : "Login to explore"}{" "}
                            </p>
                            <p className="font-bold pt-1">
                              {loginuser ? loginuser.email : "World of flavors"}{" "}
                            </p>
                          </div>
                        </div>
                        {loginuser && !tokenExpired ? (
                          <button
                            onClick={() => Logout()}
                            className="mt-10 uppercase border hover:bg-red-500 text-black font-bold px-5 py-2 rounded-sm flex gap-2 cursor-pointer"
                          >
                            Logout
                          </button>
                        ) : (
                          <Link href={"/auth/login"}>
                            <button className="mt-10 uppercase border hover:bg-red-500 text-black font-bold px-5 py-2 rounded-sm flex gap-2 cursor-pointer">
                              Login
                            </button>
                          </Link>
                        )}
                      </div>

                      <div className="bg-gray-200 my-5 h-px"></div>

                      <ul>
                        <li className="font-medium py-3">
                          <Link href={"#"} className="flex gap-4 items-center">
                            <LayoutGrid size={22} />
                            Explore Menu
                          </Link>
                        </li>
                        <li className="font-medium py-3">
                          <Link href={"#"} className="flex gap-4 items-center">
                            <StoreIcon size={22} />
                            Branch Locator
                          </Link>
                        </li>
                      </ul>

                      <div className="bg-gray-200 my-5 h-px"></div>

                      <div>
                        <Link href={"#"} className="font-medium block pb-3">
                          Blog
                        </Link>
                        <Link href={"#"} className="font-medium block">
                          Privacy Policy
                        </Link>
                      </div>
                    </div>

                    <div className="bottom">
                      <Link
                        href="tel:0000000"
                        className="py-4 px-6 flex items-center justify-between bg-[#fedc00]"
                      >
                        <img src="/uploads/images/logo.ecae5615.svg" alt="" />
                        Cheezious Hotline
                        <PhoneCall />
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/">
                <img
                  src="/uploads/images/mainLogo.webp"
                  width="200"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>

          {/* Center Column - Empty or Nav if needed */}
          <div className="w-1/1 flex gap-5 bg-gray p-4">
            <div className="w-full md:w-[80%] flex items-center">
              <form className="bg-[#f8f8f8] w-full p-2 py-3 rounded-md">
                <div className="flex items-center">
                  <span className="bg-transparent">
                    <img
                      src={"/uploads/images/searchicon.svg"}
                      width={20}
                      alt=""
                    />
                  </span>
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-none pl-2 text-gray-400 text-[18px] focus:outline-none w-[85%]"
                    placeholder="Find in cheezious"
                    aria-label="Find in cheezious"
                  />
                </div>
              </form>
            </div>

            <div className="w-full md:w-[20%] flex items-start justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex items-center border py-3 rounded-md bg-white">
                    <span className="pl-2 w-[15%]">
                      <img src={"/uploads/images/mark.svg"} width={20} alt="" />
                    </span>
                    <input
                      type="text"
                      className="flex-1 bg-transparent border-none pl-2 text-gray-400 text-[18px] focus:outline-none w-[85%]"
                      placeholder="Enter Delivery Location"
                      aria-label="Enter Delivery Location"
                    />
                    <span>
                      <ChevronRight className="text-gray-400" />{" "}
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Saved Addresses</DialogTitle>
                    <DialogDescription>
                      Please allow location for free delivery and good food
                      experience.
                    </DialogDescription>
                  </DialogHeader>

                  <div>Map</div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="py-3 px-2 text-black font-semibold uppercase cursor-pointer"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="py-3 px-2 text-black font-semibold uppercase cursor-pointer"
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* <Map /> */}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/5 bg-gray content-center">
            <div className="flex justify-end gap-4">
              <HoverCard>
                <Link href={"/cart"}>
                  <HoverCardTrigger asChild>
                    <div>
                      <button className="uppercase bg-yellow-400 hover:bg-[#8c8c8c] text-black font-bold px-5 py-2.5 rounded-sm flex gap-2 cursor-pointer">
                        <ShoppingCart />
                        Cart
                      </button>
                      <span className="relative">
                        <span className="absolute bottom-8 left-25 w-[100%]">
                          <Badge
                            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums  border border-white"
                            variant="destructive"
                          >
                            {cart.length}
                          </Badge>
                        </span>
                      </span>
                    </div>
                  </HoverCardTrigger>
                </Link>
                <HoverCardContent className="w-100">
                  <div className=" rounded rounded-md  text-center flex flex-col">
                    {cart.length < 1 ? (
                      <div className="empty-cart">
                        <img
                          src="https://cheezious.com/_next/static/media/emptycart.e7858caa.svg"
                          className="mx-auto"
                          alt="Empty Cart"
                        />
                        <h3 className="text-lg font-semibold mt-6">
                          YOUR CART IS EMPTY
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          Go ahead and explore top categories.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="top">
                          <div className="flex justify-between pb-5">
                            <span className="font-bold text-red-500">
                              Total
                            </span>
                            <span className="font-bold text-red-500">
                              Rs. {total}
                            </span>
                          </div>
                        </div>

                        <div className="max-h-[250px] overflow-y-auto flex-1 mb-4">
                          <div className="bg-white gap-5 rounded">
                            {cart.map((item, i) => (
                              <div
                                className="flex w-full bg-[#f8f8f8] rounded mb-2  p-2 "
                                key={i}
                              >
                                <div className="w-[80%] flex items-center">
                                  <div className="w-[15%]">
                                    <img src={item.image} width={"80"} alt="" />
                                  </div>
                                  <div className="w-[60%] ps-4 pt-5">
                                    <h2 className="text-left text-[14px] ">
                                      {item.title}
                                    </h2>
                                    <p className="text-start pt-1 font-bold text-orange-600 text-[14px]">
                                      Rs. {item.price}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex w-[20%] justify-end items-center">
                                  {item.quantity > 1 ? (
                                    <button
                                      className="p-1 bg-yellow-500 rounded-[50%]"
                                      onClick={() => decrement(item._id)}
                                    >
                                      <MinusIcon size={17} />
                                    </button>
                                  ) : (
                                    <button
                                      className="p-1 bg-red-500 rounded-[50%]"
                                      onClick={() => removeFromCart(item._id)}
                                    >
                                      <Trash2
                                        size={17}
                                        className="text-white"
                                        fill="transparent"
                                      />
                                    </button>
                                  )}

                                  <p className="px-2">{item.quantity}</p>
                                  <button
                                    className="p-1 bg-yellow-500 rounded-[50%]"
                                    onClick={() => increment(item._id)}
                                  >
                                    <PlusIcon size={19} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bottom">
                          <div>
                            <Link href={"/cart"}>
                              {" "}
                              <button className="uppercase bg-yellow-400 w-full p-3 font-semibold text-[18px] rounded cursor-pointer">
                                Checkout
                              </button>{" "}
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
              {loginuser && !tokenExpired ? (
                <Link href="/account/edit-profile">
                  <button className="uppercase bg-yellow-400  hover:bg-[#8c8c8c] text-black font-bold px-5 py-2.5 rounded-sm flex gap-2 cursor-pointer">
                    <User2 />
                    Account
                  </button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <button className="uppercase bg-yellow-400  hover:bg-[#8c8c8c] text-black font-bold px-5 py-2.5 rounded-sm flex gap-2 cursor-pointer">
                    <User2 />
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
