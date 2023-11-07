"use client";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

type Props = {};

const Return = (props: Props) => {
  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [listBook, setListBook] = useState<any>([]);
  const [fDate, setFDate] = useState<any>([]);
  const [value, setValue] = useState<any>([]);
  const [value2, setValue2] = useState<any>([]);
  const [textareaValue, setTextareaValue] = useState<any>([]);
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/borrow/${searchText}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data); // อัปเดตผลลัพธ์การค้นหา
        setListBook(data.data.listBook);
        dateF(); // เรียกให้คำนวณ fDate หลังจากที่ setSearchResults เสร็จ
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการค้นหาผู้ใช้", error);
    }
  };
  const submitPost = () => {
    const data = {
      name: searchResults.name,
      id: searchResults.idmember,
      listBook: listBook,
      value: value,
      text: textareaValue,
    };
    // console.log(data)
    // ทำการ POST ข้อมูลไปที่ URL http://localhost:8081/borrow
    axios
      .post("http://localhost:8081/return", data)
      .then((response) => {
        console.log("POST สำเร็จ", response);
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "บันทึกข้อมูลเสร็จสิ้น",
        });
        // ทำอะไรก็ตามที่คุณต้องการหลังจาก POST สำเร็จ
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการ ยืม", error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการ ยืม",
          text: "ไม่สามารถส่งข้อมูลไปยังเซิร์ฟเวอร์ได้",
        });
        // ทำอะไรก็ตามที่คุณต้องการหลังจากเกิดข้อผิดพลาดในการ POST
      });
  };
  const dateF = () => {
    let day = searchResults.day;
    let timestamp = new Date(searchResults.dateNowCheck);

    // กำหนดวันในเดือน
    timestamp.setDate(timestamp.getDate() + day);

    let dayFormatted = timestamp.getDate().toString().padStart(2, "0");
    let monthFormatted = (timestamp.getMonth() + 1).toString().padStart(2, "0");
    let yearFormatted = timestamp
      .getFullYear()
      .toString()
      .slice(-2)
      .padStart(2, "0");
    let formattedDate = `${dayFormatted}/${monthFormatted}/${yearFormatted}`;

    // วันปัจจุบัน
    let currentDate = new Date();
    let timeDifference = timestamp.getTime() - currentDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    let adjustedDaysDifference = daysDifference + 1;

    if (adjustedDaysDifference < 0) {
      // คำนวณค่าใหม่ตามเงื่อนไข
      const absAdjustedDaysDifference = Math.abs(adjustedDaysDifference);
      const newValue = absAdjustedDaysDifference * 10;

      setValue(newValue);
      setValue2(newValue);
    } else {
      setValue(0);
      setValue2(0);
    }

    setFDate(adjustedDaysDifference);
  };

  return (
    <div>
      <div className="w-full flex">
        <p className="text-[40px] ml-[550px]">คืนหนังสือ</p>
      </div>
      <div className="w-[950px] h-[750px] bg-[#FFA3E0] ml-[150px] mt-[50px]">
        <div className="flex flex-col items-center">
          <div className="mt-[70px]">
            <p>ตรวจสอบจาก รหัสบัตรประชาชน</p>
            <div className="flex">
              <input
                type="text"
                className="border-2 border-black text-[18px] w-[260px]"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="bg-[#35BF3B] w-[60px] ml-[20px] border-2 border-black text-white rounded-[4px]"
              >
                ค้นหา
              </button>
            </div>
          </div>
          <div className="w-[850px] h-[580px] mt-[45px] bg-white border-2 border-black">
            <div className="flex justify-center">
              <div className="w-[750px] h-[300px] border-2 border-black mt-[40px]">
                {listBook.map((book: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-around">
                      <p className="w-[80px]">{index + 1}</p>
                      <p className="w-[80px]">{book._id.slice(0, 8) + "..."}</p>
                      <p className="w-[150px]">
                        {book.name.slice(0, 24) + "..."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-[50px] mt-[25px] flex items-center">
              <div>
                {searchResults && (
                  <div>
                    <span>
                      <b>ชื่อ</b> {searchResults.name} <br /> <b>ยืมวันที่</b>{" "}
                      {searchResults.dateNow}
                    </span>
                    <br />
                    <span>
                      <b>วันที่เหลือ</b> {fDate} วัน
                    </span>
                  </div>
                )}
                <div className="flex">
                  <label>รวม</label>
                  <input
                    defaultValue={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="border-2 border-black w-[90px]"
                    type="number"
                  />
                  <p>บาท</p>
                </div>
                <div className="flex items-center mt-2">
                  <label>หมายเหตุ</label>
                  <textarea
                    onChange={(e) => setTextareaValue(e.target.value)}
                    className="border-2 border-black"
                    name=""
                    id=""
                  ></textarea>
                </div>
                <div>
                  <p className="text-[25px]">รวม {value} บาท</p>
                </div>
              </div>
              <button
                onClick={submitPost}
                className="w-[350px] h-[45px] text-white text-[20px] rounded-full border-2 ml-[90px] border-black bg-[#35BF3B]"
              >
                ยืนยันการคือหนังสือ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Return;
