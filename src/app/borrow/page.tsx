"use client";
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import QRCode from "qrcode";
import Image from "next/image";
type Props = {};
type Book = {
  // กำหนดรูปแบบข้อมูลหนังสือ
  _id: string;
  price: number;
  name: string;
  image: string;
};
type Member = [];

const Borrow = (props: Props) => {
  const router = useRouter();
  useEffect(() => {
    // ใช้ Axios ในการดึงข้อมูลจาก API
    const check = JSON.parse(String(localStorage.getItem("user")));
    if (check) {
      if (check.code != 0) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, []);
  const [books, setBooks] = useState<Book[]>([]);
  const [listBook, setListBook] = useState<Book[]>([]);
  const [addBorrow, setAddBorrow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTextBook, setSearchTextBook] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [days, setDays] = useState(0);
  const promptpayNumber = "0913700031";
  const amount = "0.1";
  const [qrModal, setQrModal] = useState(false);
  useEffect(() => {
    // ใช้ Axios ในการดึงข้อมูลจาก API
    fleshData();
  }, []);

  const genQr = async () => {
    setQrModal(true);
    setAddBorrow(false);
  };
  const cancelGenQr = async () => {
    setQrModal(false);
  };

  const onSubmit = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString().slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    const data = {
      name: searchResults.data.name,
      idmember: searchResults.data.idnumber,
      listBook: listBook,
      day: days,
      dateNow: formattedDate,
      dateNowCheck: Date.now(),
    };

    console.log(data);

    // ทำการ POST ข้อมูลไปที่ URL http://localhost:8081/borrow
    axios
      .post(process.env.NEXT_PUBLIC_API_KEY+"/borrow", data)
      .then((response) => {
        console.log("POST สำเร็จ", response);
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "บันทึกข้อมูลเสร็จสิ้น",
        });
        setSearchResults("");
        setListBook([]), setDays(0);
        // รอเวลา 1.5 วินาที (1500 มิลลิวินาที) ก่อนที่จะเปลี่ยนที่อยู่ URL
        setTimeout(function () {
          window.location.href = "/listreturn";
        }, 1500);

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

  const showEditModal = (book: any) => {
    setAddBorrow(true);
  };
  const handleSearch = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_KEY+`/user/${searchText}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data); // อัปเดตผลลัพธ์การค้นหา
        console.log(data.data);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการค้นหาผู้ใช้", error);
    }
  };
  const fleshData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_KEY+"/book")
      .then((response) => {
        console.log(process.env.NEXT_PUBLIC_API_KEY)
        // สั่ง setBooks เพื่อเซ็ตข้อมูลหนังสือ
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
      });
  };
  const handleBookSelect = (book: Book) => {
    // ตรวจสอบว่าหนังสืออยู่ใน listBook หรือไม่
    const bookIndex = listBook.findIndex(
      (selectedBook) => selectedBook.name === book.name
    );

    if (bookIndex !== -1) {
      // หากหนังสืออยู่ใน listBook ให้ลบออก
      const updatedListBook = [...listBook];
      updatedListBook.splice(bookIndex, 1);
      setListBook(updatedListBook);
    } else {
      // หากหนังสือไม่อยู่ใน listBook ให้เพิ่มเข้าไป
      setListBook([...listBook, book]);
    }
  };

  console.log(books);

  const handleSearchBook = () => {
    // ค้นหาหนังสือที่ตรงกับ searchTextBook ใน books[].name
    const searchResult = books.filter((book) =>
      book.name.includes(searchTextBook)
    );
    // เปลี่ยนค่า books เป็นรายการที่ค้นหาได้
    setBooks(searchResult);

    if (searchTextBook == "") {
      fleshData();
    }
  };

  return (
    <div>
      <div className="flex justify-center w-full">
        <h1 className="text-[40px]">ยืมหนังสือ</h1>
      </div>
      <div className="flex">
        <div className="w-[850px] h-[750px] bg-[#FFA3E0] rounded-[15px] ml-[50px] mt-[50px] border-2 border-black">
          <div className="mt-[50px] ml-4 flex items-center">
            <input
              className="text-[25px] w-[250px] rounded-[8px] border-2 border-black"
              placeholder="ค้นหาจากชื่อหนังสือ"
              type="text"
              onChange={(e) => setSearchTextBook(e.target.value)}
            />
            <button
              onClick={handleSearchBook}
              className="bg-[#35BF3B] ml-5 h-[37px] text-white rounded-[8px] w-[76px] "
            >
              ค้นหา
            </button>
          </div>
          <div className="w-[690px] h-[550px] bg-white ml-[50px] mt-[70px] border-2 border-black overflow-auto flex flex-col items-center">
            <div className="w-[655px] h-[45px] bg-white mt-[35px] border-2 border-black flex items-center justify-around">
              <p className="w-[131px]">การเลือก</p>
              <p className="w-[131px]">รหัสหนังสือ</p>
              <p className="w-[131px]">ชื่อหนังสือ</p>
              <p className="w-[131px]">รูปหนังสือ</p>
            </div>
            <div className="w-[655px] bg-white mt-2	">
              {books.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center mt-3 justify-around"
                >
                  <div className="w-[131px]">
                    <div className="w-[131px]">
                      <input
                        className="ml-[20px]"
                        type="checkbox"
                        name=""
                        id=""
                        checked={listBook.some(
                          (book) => book.name === item.name
                        )} // เปลี่ยนเป็นการใช้ some และเปรียบเทียบแบบเจาะจง
                        onChange={() => handleBookSelect(item)}
                      />
                    </div>
                  </div>
                  <p className="w-[131px]">{item._id.slice(0, 12)}</p>
                  <p className="w-[131px]">{item.name}</p>
                  <div className="w-[131px]">
                    <img className="w-[90px]" src={item.image} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[450px] h-[750px] bg-[#FFA3E0] rounded-[15px] ml-[20px] mt-[50px] border-2 border-black">
          <div className="w-[350px] h-[50px] mt-[50px] ml-[50px] bg-[#ECEAEA] border-2 border-black flex justify-around items-center">
            <p>ลำดับ</p>
            <p>รหัสหนังสือ</p>
            <p>ชื่อหนังสือ</p>
          </div>
          <div className="w-[350px] h-[550px] border-2 border-black  bg-white ml-[50px] mt-[10px]">
            {listBook.map((book: Book, index: number) => (
              <div key={index}>
                <div className="flex justify-around">
                  <p className="w-[80px]">{index + 1}</p>
                  <p className="w-[80px]">{book._id.slice(0, 8) + "..."}</p>
                  <p className="w-[80px]">{book.name.slice(0, 8) + "..."}</p>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => showEditModal(listBook)}
              // onClick={genQr}
              className="w-[250px] h-[45px] bg-[#35BF3B] mt-4 rounded-[10px] text-white text-[25px]"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
      <Modal
        title="QrCode"
        visible={qrModal}
        onCancel={cancelGenQr}
        onOk={onSubmit}
        okButtonProps={{
          className: "bg-pink-500 hover:bg-pink-700 text-white",
        }}
      >
        <div>
          <img
            src={`https://promptpay.io/0611012709/${listBook.length * 5}.png`}
            alt="QR Code"
          />
        </div>
      </Modal>

      <Modal
        title="ยืมหนังสือ"
        visible={Boolean(addBorrow)}
        onOk={genQr}
        onCancel={() => setAddBorrow(false)}
        okButtonProps={{ className: 'bg-pink-500 hover:bg-pink-700 text-white' }}
      >
        <div className="w-full h-[250px] bg-white overflow-auto">
          <div className="flex">
            <input
              type="text"
              className="border-2 border-black text-[18px] w-[260px]"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="text-white w-[80px] h-[35px] bg-[#35BF3B] ml-[8px] border-2 border-black"
              onClick={handleSearch}
            >
              ค้นหา
            </button>
            {searchResults.data?.name && (
              <div>
                <p className="text-green-500">ค้นพบข้อมูล</p>
                <p>{searchResults.data?.name}</p>
              </div>
            )}
          </div>
          <div>
            <p>จำนวนวัน</p>
            <div className="flex">
              <input
                onChange={(e) => setDays(Number(e.target.value))}
                type="number"
                className="border-2 border-black w-[80px]"
              />
              <p>วัน</p>
            </div>
          </div>
          <div className="border-2 border-black overflow-auto">
            {listBook.map((book: any, index: number) => (
              <div key={index}>
                <div className="flex justify-around">
                  <p className="w-[80px]">{index + 1}</p>
                  <p className="w-[80px]">{book._id.slice(0, 8) + "..."}</p>
                  <p className="w-[150px]">{book.name.slice(0, 24) + "..."}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {/* <button
              onClick={genQr}
              className="text-white w-[220px] h-[35px] bg-[#35BF3B] text-[25px] flex items-center justify-center ml-[8px] border-2 border-black"
            >
              ยืนยัน
            </button> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Borrow;
