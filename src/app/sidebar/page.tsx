'use client'
import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation'


type Props = {}

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  return (
    <div>
      <div className="bg-[#FFA3E0] w-[250px] h-[100vh]">
        <div className="ml-5 ">
          <ul className="w-full h-[70vh] flex flex-col justify-between">
            <li className="mt-5">
              <Link className={`text-[25px] ${pathname === '/borrow' ? 'underline' : ''}`} href={"borrow"}>
                ยืมหนังสือ
              </Link>
            </li>
            <li>
              <Link className={`text-[25px] ${pathname === '/return' ? 'underline' : ''}`} href={"return"}>
                คืนหนังสือ
              </Link>
            </li>
            <li>
              <Link className={`text-[25px] ${pathname === '/listbook' ? 'underline' : ''}`} href={"listbook"}>
                รายการหนังสือ
              </Link>
            </li>
            <li>
              <Link  className={`text-[25px] ${pathname === '/listmember' ? 'underline' : ''}`} href={"listmember"}>
                รายการสมาชิก
              </Link>
            </li>
            <li>
              <Link className={`text-[25px] ${pathname === '/listreturn' ? 'underline' : ''}`} href={"listreturn"}>
                กำหนดรายการคืนหนังสือ
              </Link>
            </li>
            <li>
              <Link className={`text-[25px] ${pathname === '/addmember' ? 'underline' : ''}`} href={"addmember"}>
                เพิ่มสมาชิก
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-4">
            <button className="bg-[#F25E5E] w-[159px] h-[33px]">
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar