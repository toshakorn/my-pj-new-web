import React from "react";

type Props = {};

const AddMember = (props: Props) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="mt-[5px] text-[35px]">เพิ่มสมาชิก</h1>
        <div className="w-[1250px] border-2 border-black rounded-[18px] mt-[5px] h-[800px] bg-[#FFA3E0] ml-[50px] flex flex-col items-center">
          <div className="w-[1150px] h-[750px] bg-white mt-2 border-2 border-black">
            <div className="flex flex-col justify-center h-[400px] ml-[150px]">
              <div>
                <p className="text-[35px]">ชื่อ นามสกุล</p>
                <input type="text" className="border-2 border-black text-[25px]" />
              </div>
              <div>
                <p className="text-[35px]">เลขบัตรประจำตัวประชาชน</p>
                <input type="text" className="border-2 border-black text-[25px]" />
              </div>
            </div>
            <button className="w-[350px] rounded-[8px] h-[45px] bg-[#35BF3B] text-white ml-[400px] text-[35px]">เพิ่มสมาชิก</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
