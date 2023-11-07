"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {

  useEffect(() => {
    // ใช้ Axios ในการดึงข้อมูลจาก API
    const check = JSON.parse(String(localStorage.getItem("user")))
    console.log(check)
  }, []);

  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async () => {
    const data = {
      email: credentials.username,
      password: credentials.password,
    };
    try {
      const response = await fetch("http://localhost:8081/owner/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Login successful
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("user",JSON.stringify(data))
        if (data.code == 0) {
          router.push("/borrow")
        }
        // Redirect on the client side
      } else {
        // Login failed
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("An error occurred while processing the request:", error);
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };
  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <div className="w-[500px] rounded-[10px] h-[650px] bg-[#FFA3E0] flex flex-col items-center">
        <div className="w-[250px] h-[45px] bg-[#FFFFFF] flex justify-center items-center rounded-[7px] mt-9">
          <p className="text-[25px]">Welcome Admin</p>
        </div>
        <div className="flex flex-col items-center  mt-[15px]">
          <p className="text-[35px]">ระบบ ยืม/คืนหนังสือ</p>
          <div className=" mt-[25px] flex flex-col items-center">
            <p className="text-[25px]">username</p>
            <input
              className="text-[25px]"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-[35px] flex flex-col items-center">
            <p className="text-[25px]">password</p>
            <input
              className="text-[25px]"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="mt-[45px] bg-[#35BF3B] bg-opacity-[65%] w-[250px] h-[50px] text-[30px] text-white rounded-[8px]"
            onClick={handleLogin}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </div>
  );
}
