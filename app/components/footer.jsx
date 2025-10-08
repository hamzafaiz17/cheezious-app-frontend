import Link from "next/link";
function HomeFooter() {
  return (
    <>
      <div>
        <div className="bg-[#f8f8f8] py-5 text-center">
          <p>
            {" "}
            <img
              src={"/uploads/images/footerlogo.19a797d2.svg"}
              alt=""
              className="inline pe-2"
            />{" "}
            Cheezious Copyright © 2025. All Rights Reserved.
          </p>
          <div className="pt-4">
            <ul className="flex gap-2 justify-center">
              <li>
                <Link
                  href={"/privacy-policy"}
                  className="font-bold text-[10px]"
                >
                  TERMS & CONDITIONS
                </Link>
              </li>
              <li>|</li>
              <li>
                <Link
                  href={"/privacy-policy"}
                  className="font-bold text-[10px]"
                >
                  PRIVACY POLICY
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeFooter;
