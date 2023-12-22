"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // นำเข้า Axios
import Swal from "sweetalert2";
import { Button, Form, Input, Modal } from "antd";

type Props = {};
type User = {
  // กำหนดรูปแบบข้อมูลหนังสือ
  _id: string; // เพิ่มฟิลด์ _id
  name: string;
  idnumber: string;
};

const ListMember = (props: Props) => {
  const [userData, setUserData] = useState<User[]>([]);
  const [editMember, setEditMember] = useState<User | null>(null);
  const [editMemberData, setEditMemberData] = useState<User | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [name, setName] = useState<string>("");
  const [idnumber, setIdnumber] = useState<string>("");

  useEffect(() => {
    // ใช้ Axios ในการดึงข้อมูลจาก API
    fetchData();
  }, []);

  const handleEdit = (member: User) => {
    setEditMemberData(member);
    console.log(member);
    setName(member.name); // กำหนดค่าเริ่มต้นของ name
    setIdnumber(member.idnumber); // กำหนดค่าเริ่มต้นของ idnumber
    setEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    if (editMemberData) {
      const editedData = {
        name: name,
        idnumber: idnumber,
      };
      console.log(editedData);
      axios
        .put(process.env.NEXT_PUBLIC_API_KEY+`/user/${editMemberData._id}`, editedData)
        .then(() => {
          Swal.fire("แก้ไขสมาชิกสำเร็จ", "", "success");
          fetchData();
          setEditModalVisible(false);
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการแก้ไขสมาชิก: ", error);
          Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถแก้ไขสมาชิกได้", "error");
        });
    }
  };

  const handleEditCancel = () => {
    setEditMemberData(null);
    setEditModalVisible(false); // ปิด Modal โดยเรียก setEditModalVisible(false)
    console.log("HI");
  };

  const handleDelete = (index: number) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบสมาชิกนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบ!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = userData[index]._id;
        axios
          .delete(process.env.NEXT_PUBLIC_API_KEY+`/user/${userId}`)
          .then(() => {
            Swal.fire("ลบสมาชิกสำเร็จ", "", "success");
            fetchData();
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการลบสมาชิก: ", error);
            Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถลบสมาชิกได้", "error");
          });
      }
    });
  };

  const fetchData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_KEY+"/user")
      .then((response) => {
        // สั่ง setBooks เพื่อเซ็ตข้อมูลหนังสือ
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-[5px] text-[35px]">รายการสมาชิก</h1>
      <div className="w-[1250px] border-2 border-black rounded-[18px] mt-[5px] h-[800px] bg-[#FFA3E0] ml-[50px] flex flex-col items-center">
        <div className="w-[1150px] h-[45px] bg-white mt-[35px] border-2 border-black flex items-center">
          <p className="w-[330px]">ลำดับ</p>
          <p className="w-[330px]">ชื่อ</p>
          <p className="w-[330px]">รหัสบัตรประชาชน</p>
          <p className="w-[330px]">จัดการ</p>
        </div>
        <div className="w-[1150px] h-[600px] bg-white mt-2 border-2 border-black overflow-auto">
          {userData.map((item: any, index: number) => (
            <div key={index} className="flex items-center mt-3">
              <p className="w-[280px] ml-[15px]">{index + 1}</p>
              <p className="w-[280px]">{item.name}</p>
              <p className="w-[280px]">{item.idnumber}</p>
              <div>
                <button
                  className="bg-yellow-400 mr-4 w-[45px] h-[35px] rounded-[7px]"
                  onClick={() => handleEdit(item)}
                >
                  แก้ไข
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="ml-4 bg-red-600 w-[45px] h-[35px] rounded-[7px]"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
        <Modal
          title="แก้ไขสมาชิก"
          visible={editModalVisible}
          onOk={handleEditSubmit}
          onCancel={handleEditCancel}
          okButtonProps={{ className: 'bg-pink-500 hover:bg-pink-700 text-white' }}

        >
          <div>
            <p>ชื่อหนังสือ</p>
            <input
              className="border-2 border-black"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p>รหัสบัตรประชาชน</p>
            <input
              className="border-2 border-black"
              type="text"
              name="idnumber"
              value={idnumber}
              onChange={(e) => setIdnumber(e.target.value)}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ListMember;
