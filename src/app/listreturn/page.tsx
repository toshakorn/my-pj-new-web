"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const ListReturn = (props: Props) => {
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    // ใช้ Axios ในการดึงข้อมูลจาก API
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get("http://localhost:8081/borrow")
      .then((response) => {
        // สั่ง setBooks เพื่อเซ็ตข้อมูลหนังสือ
        setUserData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
      });
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-[5px] text-[35px]">กำหนดคืนหนังสือ</h1>
      <div className="w-[1250px] border-2 border-black rounded-[18px] mt-[5px] h-[800px] bg-[#FFA3E0] ml-[50px] flex flex-col items-center">
        <div className="w-[1150px] h-[45px] bg-white mt-[35px] border-2 border-black flex justify-around items-center">
          <p>ลำดับ</p>
          <p>ชื่อ</p>
          <p>กำหนดการคืน</p>
        </div>
        <div className="w-[1150px] h-[600px] bg-white mt-2 border-2 border-black">
          {userData.map((item: any, index: number) => {
            let day = item.day;
            let timestamp = new Date(item.dateNowCheck);

            // กำหนดวันในเดือน
            timestamp.setDate(timestamp.getDate() + day);

            let dayFormatted = timestamp.getDate().toString().padStart(2, "0");
            let monthFormatted = (timestamp.getMonth() + 1)
              .toString()
              .padStart(2, "0");
            let yearFormatted = timestamp
              .getFullYear()
              .toString()
              .slice(-2)
              .padStart(2, "0");
            let formattedDate = `${dayFormatted}/${monthFormatted}/${yearFormatted}`;

            // วันปัจจุบัน
            let currentDate = new Date();
            let timeDifference = timestamp.getTime() - currentDate.getTime();
            let daysDifference = Math.floor(
              timeDifference / (1000 * 3600 * 24)
            );

            let dateClass = "";
            if (daysDifference < 0) {
              dateClass = "text-red-600";
            } else if (daysDifference <= 3) {
              dateClass = "text-yellow-600";
            } else if (daysDifference >= 4) {
              dateClass = "text-green-600";
            }

            return (
              <div key={index} className="flex mt-3 justify-around w-full">
                <p className="w-[150px] flex ml-[80px] ">
                  {index + 1}
                </p>
                <p className="w-[150px]  flex justify-start ">{item.name}</p>
                <p className={`w-[150px]  flex justify-start  ${dateClass}`}>
                  {formattedDate}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListReturn;
