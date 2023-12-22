"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

type Props = {};

const AddMember = (props: Props) => {
  const [name, setName] = useState("");
  const [idCard, setIdCard] = useState("");

  const handleAddMember = () => {
    const data = {
      name: name,
      idnumber: idCard,
    };
  
    // ทำการตรวจสอบว่ามีผู้ใช้นี้อยู่ในฐานข้อมูลหรือไม่
    fetch(process.env.NEXT_PUBLIC_API_KEY+"/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 205) {
          // ถ้ามีผู้ใช้นี้อยู่แล้ว
          Swal.fire({
            icon: 'warning',
            title: 'มี member คนนี้อยู่แล้ว',
            text: 'โปรดตรวจสอบอีกครั้ง',
          });
          console.log("มีผู้ใช้นี้อยู่แล้ว");
        } else {
          // ถ้ายังไม่มีผู้ใช้นี้ในฐานข้อมูล
          // ทำการ POST ข้อมูลใหม่
          fetch(process.env.NEXT_PUBLIC_API_KEY+"/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'เพิ่มสมาชิกสำเร็จ',
                  showConfirmButton: false,
                  timer: 1500,
                });
                setTimeout(function () {
                  window.location.href = "/listmember";
                }, 1500);
                console.log("เพิ่มสมาชิกสำเร็จ");

              } else {
                console.error("การเพิ่มสมาชิกล้มเหลว");
              }
            })
            .catch((error) => {
              console.error("เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย: " + error);
            });
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบผู้ใช้: " + error);
      });
  };
  
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="mt-[5px] text-[35px]">เพิ่มสมาชิก</h1>
        <div className="w-[1250px] border-2 border-black rounded-[18px] mt-[5px] h-[800px] bg-[#FFA3E0] ml-[50px] flex flex-col items-center">
          <div className="w-[1150px] h-[750px] bg-white mt-2 border-2 border-black">
            <div className="flex flex-col justify-center h-[400px] ml-[150px]">
              <div>
                <p className="text-[35px]">ชื่อ นามสกุล</p>
                <input
                  type="text"
                  className="border-2 border-black text-[25px]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <p className="text-[35px]">เลขบัตรประจำตัวประชาชน</p>
                <input
                  type="number"
                  className="border-2 border-black text-[25px]"
                  value={idCard}
                  onChange={(e) => setIdCard(e.target.value)}
                />
              </div>
            </div>
            <button
              className="w-[350px] rounded-[8px] h-[45px] bg-[#35BF3B] text-white ml-[400px] text-[35px]"
              onClick={handleAddMember}
            >
              เพิ่มสมาชิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
