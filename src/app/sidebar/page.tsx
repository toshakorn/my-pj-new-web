import Link from "next/link";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div>
      <div className="bg-[#FFA3E0] w-[250px] h-[100vh]">
        <div className="ml-5 ">
          <ul className="w-full h-[70vh] flex flex-col justify-between">
            <li className="mt-5">
              <Link className="text-[25px]" href={"borrow"}>
                ยืมหนังสือ
              </Link>
            </li>
            <li>
              <Link className="text-[25px]" href={"return"}>
                คืนหนังสือ
              </Link>
            </li>
            <li>
              <Link className="text-[25px]" href={"listbook"}>
                รายการหนังสือ
              </Link>
            </li>
            <li>
              <Link className="text-[25px]" href={"listmember"}>
                รายการสมาชิก
              </Link>
            </li>
            <li>
              <Link className="text-[25px]" href={"listreturn"}>
                กำหนดรายการคืนหนังสือ
              </Link>
            </li>
            <li>
              <Link className="text-[25px]" href={"addmember"}>
                เพิ่มสมาชิก
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-4">
            <button className="bg-[#F25E5E] w-[159px] h-[33px]">ออกจากระบบ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
