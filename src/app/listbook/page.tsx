import React from "react";

type Props = {};

const ListBook = (props: Props) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-[5px] text-[35px]">รายการหนังสือ</h1>
      <div className="w-[1250px] border-2 border-black rounded-[18px] mt-[5px] h-[800px] bg-[#FFA3E0] ml-[50px] flex flex-col items-center">
        <div className="w-[1150px] h-[45px] bg-white mt-[35px] border-2 border-black flex justify-around items-center">
          <p>ลำดับ</p>
          <p>รหัสหนังสือ</p>
          <p>ชื่อหนังสือ</p>
          <p>รูปหนังสือ</p>
          <p>จัดการ</p>
        </div>
        <div className="w-[1150px] h-[600px] bg-white mt-2 border-2 border-black"></div>
        <div className="w-full">
          <div className="flex justify-end">
            <button className="mr-[50px] text-[35px] bg-[#35BF3B] text-white w-[250px] mt-5 rounded-[18px]">เพิ่มหนังสือ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBook;
