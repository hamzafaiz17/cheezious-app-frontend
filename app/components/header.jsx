import "@/public/css/style.css";
import "leaflet/dist/leaflet.css";

import HeaderS from "../(public)/menu/headerstructure";
export default function Header() {
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      </style>

      <header className="px-4 sticky top-0 z-50 bg-white">
        <div className="w-full  ">
          <HeaderS />
        </div>
      </header>
    </>
  );
}
