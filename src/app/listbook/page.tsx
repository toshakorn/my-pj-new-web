"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // นำเข้า Axios

type Book = {
  // กำหนดรูปแบบข้อมูลหนังสือ
  id: number;
  code: string;
  name: string;
  image: string;
};
type Props = {};

const ListBook = (props: Props) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // ใช้ Axios ในการดึงข้อมูลจาก API
    axios
      .get("http://localhost:8081/book")
      .then((response) => {
        // สั่ง setBooks เพื่อเซ็ตข้อมูลหนังสือ
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-[5px] text-[35px]">รายการหนังสือ</h1>
      <div className="w-[1250px] border-2 border-black rounded-[18px] mt-[5px] h-[800px] bg-[#FFA3E0] ml-[50px] flex flex-col items-center">
        <div className="w-[1150px] h-[45px] bg-white mt-[35px] border-2 border-black flex items-center">
          <p className="w-[230px] ml-[15px]">ลำดับ</p>
          <p className="w-[230px]">รหัสหนังสือ</p>
          <p className="w-[230px]">ชื่อหนังสือ</p>
          <p className="w-[230px]">รูปหนังสือ</p>
          <p className="w-[230px]">จัดการ</p>
        </div>
        <div className="w-[1150px] h-[600px] bg-white mt-2 border-2 border-black overflow-auto	">
          {books.map((item: any, index: number) => (
            <div key={index} className="flex items-center mt-3">
              <p className="w-[230px] ml-[15px]">{index + 1}</p>
              <p className="w-[230px]">{item._id}</p>
              <p className="w-[230px]">{item.body.name}</p>
              <div className="w-[230px]">
                <img className="w-[90px]" src={item.body.image} alt="" />
              </div>
              <div>
                <button className="bg-yellow-400 mr-4 w-[45px] h-[35px] rounded-[7px]">แก้ไข</button>
                <button className="ml-4 bg-red-600 w-[45px] h-[35px] rounded-[7px]">ลบ</button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full">
          <div className="flex justify-end">
            <button className="mr-[50px] text-[35px] bg-[#35BF3B] text-white w-[250px] mt-5 rounded-[18px]">
              เพิ่มหนังสือ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBook;
