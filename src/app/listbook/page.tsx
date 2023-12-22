"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // นำเข้า Axios
import Swal from "sweetalert2";
import { Button, Modal } from "antd";
type Book = {
  // กำหนดรูปแบบข้อมูลหนังสือ
  price: number;
  name: string;
  image: string;
};

type Props = {};

const ListBook = (props: Props) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    name: "",
    image: "",
    price: 0,
  });
  const [editBook, setEditBook] = useState({
    _id: "", // ระบุ _id ของหนังสือที่ต้องการแก้ไข
    name: "",
    image: "",
    price: "",
  });

  const showEditModal = (book: any) => {
    setEditBook(book);
    setIsEditModalOpen(true);
  };

  const handleEdit = () => {
    axios
      .put(process.env.NEXT_PUBLIC_API_KEY+`/book/${editBook._id}`, editBook)
      .then((response) => {
        setIsEditModalOpen(false);
        // หลังจากแก้ไขสำเร็จ ควรเรียกใช้ fleshData() เพื่ออัปเดตรายการหนังสือ
        fleshData();
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการแก้ไขหนังสือ: ", error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };
  
  

  const handleDeleteBook = (bookId: string) => {
    // ใช้ SweetAlert2 เพื่อแสดงข้อความยืนยันการลบ
    Swal.fire({
      title: "ยืนยันการลบหนังสือ",
      text: "คุณแน่ใจหรือไม่ที่ต้องการลบหนังสือนี้?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        // หากผู้ใช้คลิก "ลบ"
        axios
          .delete(process.env.NEXT_PUBLIC_API_KEY+`/book/${bookId}`)
          .then((response) => {
            // หากลบสำเร็จ อัปเดตรายการหนังสือ
            // setBooks(response.data);
            fleshData();
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการลบหนังสือ: ", error);
          });
      }
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // ทำ POST request เพื่อสร้างหนังสือใหม่
    axios
      .post(process.env.DB_API_TEST+"/book", newBook)
      .then((response) => {
        // สั่ง setBooks เพื่ออัปเดตรายการหนังสือ
        fleshData();
        console.log(newBook);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการสร้างหนังสือ: ", error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // ใช้ Axios ในการดึงข้อมูลจาก API
    fleshData();
  }, []);

  const fleshData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_KEY+"/book")
      .then((response) => {
        // สั่ง setBooks เพื่อเซ็ตข้อมูลหนังสือ
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
      });
  };

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
              <p className="w-[230px]">{item.name}</p>
              <div className="w-[230px]">
                <img className="w-[90px]" src={item.image} alt="" />
              </div>
              <div>
                <button
                  className="bg-yellow-400 mr-4 w-[45px] h-[35px] rounded-[7px]"
                  onClick={() => showEditModal(item)}
                >
                  แก้ไข
                </button>
                <button
                  className="ml-4 bg-red-600 w-[45px] h-[35px] rounded-[7px]"
                  onClick={() => handleDeleteBook(item._id)}
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full">
          <div className="flex justify-end">
            <button
              onClick={showModal}
              className="mr-[50px] text-[35px] bg-[#35BF3B] text-white w-[250px] mt-5 rounded-[18px]"
            >
              เพิ่มหนังสือ
            </button>
          </div>
        </div>
        <Modal
          title="เพิ่มหนังสือ"
          visible={Boolean(isModalOpen)}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <p>ชื่อหนังสือ</p>
            <input
              className="border-2 border-black"
              type="text"
              name="name"
              value={newBook.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p>URL รูปหนังสือ</p>
            <input
              className="border-2 border-black"
              type="text"
              name="image"
              value={newBook.image}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p>ราคา</p>
            <input
              className="border-2 border-black"
              type="number"
              name="price"
              value={newBook.price}
              onChange={handleInputChange}
            />
          </div>
        </Modal>
        <Modal
          title="แก้ไขหนังสือ"
          visible={Boolean(isEditModalOpen)}
          onOk={handleEdit}
          onCancel={() => setIsEditModalOpen(false)}
          okButtonProps={{ className: 'bg-pink-500 hover:bg-pink-700 text-white' }}
        >
          <div>
            <p>ชื่อหนังสือ</p>
            <input
              className="border-2 border-black"
              type="text"
              name="name"
              value={editBook.name}
              onChange={(e) =>
                setEditBook({ ...editBook, name: e.target.value })
              }
            />
          </div>
          <div>
            <p>รูปหนังสือ</p>
            <input
              className="border-2 border-black"
              type="text"
              name="image"
              value={editBook.image}
              onChange={(e) =>
                setEditBook({ ...editBook, image: e.target.value })
              }
            />
          </div>
          <div>
            <p>ราคา</p>
            <input
              className="border-2 border-black"
              type="number"
              name="price"
              value={editBook.price}
              onChange={(e) =>
                setEditBook({ ...editBook, price: e.target.value })
              }
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ListBook;
