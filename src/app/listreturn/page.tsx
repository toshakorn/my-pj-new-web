import React from "react";

type Props = {};

const ListReturn = (props: Props) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-[5px] text-[35px]">กำหนดคืนหนังสือ</h1>
      <div className="w-[1250px] border-2 border-black rounded-[18px] mt-[5px] h-[800px] bg-[#FFA3E0] ml-[50px] flex flex-col items-center">
        <div className="w-[1150px] h-[45px] bg-white mt-[35px] border-2 border-black flex justify-around items-center">
          <p>ลำดับ</p>
          <p>ชื่อ</p>
          <p>กำหนดการคืน</p>
        </div>
        <div className="w-[1150px] h-[600px] bg-white mt-2 border-2 border-black"></div>
      </div>
    </div>
  );
};

export default ListReturn;
