import React from "react";

type Props = {};

const Borrow = (props: Props) => {
  return (
    <div className="flex">
      <div className="w-[750px] h-[750px] bg-[#FFA3E0] rounded-[15px] ml-[50px] mt-[50px] border-2 border-black">
        <div className="mt-[50px] ml-4 flex items-center">
          <input
            className="text-[25px] w-[250px] rounded-[8px] border-2 border-black"
            placeholder="ค้นหาจากรหัสหนังสือ"
            type="text"
          />
          <button className="bg-[#35BF3B] ml-5 h-[37px] text-white rounded-[8px] w-[76px] ">
            ค้นหา
          </button>
        </div>
        <div className="w-[650px] h-[550px] bg-white ml-[50px] mt-[70px] border-2 border-black "></div>
      </div>
      <div className="w-[450px] h-[750px] bg-[#FFA3E0] rounded-[15px] ml-[50px] mt-[50px] border-2 border-black">
        <div className="w-[350px] h-[50px] mt-[50px] ml-[50px] bg-[#ECEAEA] border-2 border-black flex justify-around items-center">
          <p>ลำดับ</p>
          <p>รหัสหนังสือ</p>
          <p>ชื่อหนังสือ</p>
        </div>
        <div className="w-[350px] h-[550px] border-2 border-black  bg-white ml-[50px] mt-[60px]"></div>
      </div>
    </div>
  );
};

export default Borrow;
