import React from "react";

type Props = {};

const Return = (props: Props) => {
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
              <input type="text" className=" w-[250px] border-2 border-black" />
              <button className="bg-[#35BF3B] w-[60px] ml-[20px] border-2 border-black text-white rounded-[4px]">ค้นหา</button>
            </div>
          </div>
          <div className="w-[850px] h-[550px] mt-[45px] bg-white border-2 border-black">
            <div className="flex justify-center">
              <div className="w-[750px] h-[300px] border-2 border-black mt-[40px]"></div>
            </div>
            <div className="ml-[50px] mt-[25px] flex items-center">
              <div>
                <p className="text-[20px]">ไม่เลยเวลาตามที่กำหนด</p>
                <div className="flex">
                  <label>อื่นๆ</label>
                  <input
                    className="border-2 border-black w-[90px]"
                    type="number"
                  />
                  <p>บาท</p>
                </div>
                <div className="flex items-center mt-2">
                  <label>หมายเหตุ</label>
                  <textarea
                    className="border-2 border-black"
                    name=""
                    id=""
                  ></textarea>
                </div>
                <div>
                  <p className="text-[25px]">รวม 0 บาท</p>
                </div>
              </div>
              <button className="w-[350px] h-[45px] text-white text-[20px] rounded-full border-2 ml-[90px] border-black bg-[#35BF3B]">
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
