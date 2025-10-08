import {
  AlignRightIcon,
  ShoppingCart,
  User2,
  UserRoundIcon,
  StoreIcon,
  LayoutGrid,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

function HomeHeader() {
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
                    <div className="bg-yellow-300 p-2.5 rounded-full">
                      <UserRoundIcon size={30} />
                    </div>
                    <div>
                      <p className="font-light">Login to explore</p>
                      <p className="font-bold pt-1">World of flavors</p>
                    </div>
                  </div>
                  <Link href={"/auth/login"}>
                    <button className="mt-10 uppercase border hover:bg-red-500 text-black font-bold px-5 py-2 rounded-sm flex gap-2 cursor-pointer">
                      Login
                    </button>
                  </Link>
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
                <a
                  href="tel:0000000"
                  className="py-4 px-6 flex items-center justify-between bg-[#fedc00]"
                >
                  <img src="/uploads/images/logo.ecae5615.svg" alt="" />
                  Cheezious Hotline
                  <PhoneCall />
                </a>
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
          <Link href="/auth/login">
            <User2 className="text-black" color="#f15929" />
          </Link>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex max-width">
        <div className="flex flex-row w-full">
          {/* Left Column */}
          <div className="w-1/3 bg-gray p-4 px-10">
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
                          <div className="bg-yellow-300 p-2.5 rounded-full">
                            <UserRoundIcon size={30} />
                          </div>
                          <div>
                            <p className="font-light">Login to explore</p>
                            <p className="font-bold pt-1">World of flavors</p>
                          </div>
                        </div>
                        <Link href={"/auth/login"}>
                          <button className="mt-10 uppercase border hover:bg-red-500 text-black font-bold px-5 py-2 rounded-sm flex gap-2 cursor-pointer">
                            Login
                          </button>
                        </Link>
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
                      <a
                        href="tel:0000000"
                        className="py-4 px-6 flex items-center justify-between bg-[#fedc00]"
                      >
                        <img src="/uploads/images/logo.ecae5615.svg" alt="" />
                        Cheezious Hotline
                        <PhoneCall />
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/">
                <img
                  src="/uploads/images/mainLogo.webp"
                  width="180"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>

          {/* Center Column - Empty or Nav if needed */}
          <div className="w-1/3 bg-gray p-4"></div>

          {/* Right Column */}
          <div className="w-1/3 bg-gray p-4 px-10">
            <div className="flex justify-end gap-4">
              <button className="uppercase bg-yellow-400 hover:bg-gray-500 text-black font-bold px-5 py-2.5 rounded-sm flex gap-2 cursor-pointer">
                <ShoppingCart />
                Cart
              </button>
              <Link href="/auth/login">
                <button className="uppercase bg-yellow-400 hover:bg-gray-500 text-black font-bold px-5 py-2.5 rounded-sm flex gap-2 cursor-pointer">
                  <User2 />
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeHeader;
