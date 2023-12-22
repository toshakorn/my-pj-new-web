"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // นำเข้า Axios
import Swal from "sweetalert2";
import { Button, Form, Input, Modal } from "antd";

type Props = {};

const ListMember = (props: Props) => {
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    // ใช้ Axios ในการดึงข้อมูลจาก API
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_KEY+"/return")
      .then((response) => {
        // สั่ง setBooks เพื่อเซ็ตข้อมูลหนังสือ
        setUserData(response.data);
        console.log("response", response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-[5px] text-[35px]">รายการที่ยืม</h1>
      <div className="w-[1250px] border-2 border-black rounded-[18px] mt-[5px] h-[800px] bg-[#FFA3E0] ml-[50px] flex flex-col items-center">
        <div className="w-[1150px] h-[45px] bg-white mt-[35px] border-2 border-black flex items-center">
          <p className="w-[330px]">ลำดับ</p>
          <p className="w-[330px]">ชื่อ</p>
          <p className="w-[330px]">ค่าปรับ/เพราะ</p>
          <p className="w-[330px]">รายการที่ยืม</p>
        </div>
        <div className="w-[1150px] h-[600px] bg-white mt-2 border-2 border-black overflow-auto">
          {userData.map((item: any, index: number) => (
            <div key={index} className="flex items-center mt-3 border-b-2 ">
              <p className="w-[280px] ml-[15px]">{index + 1}</p>
              <p className="w-[280px]">{JSON.stringify(item.data.name)}</p>
              <p className="w-[280px]">{item.data.value} / {item.data.text}</p>
              <div className="w-[280px]">
                {item.data.listBook.map((item2: any, index2: number) => (
                  <p key={index2}>{item2.name}</p>
                ))}
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListMember;
