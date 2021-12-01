import { NextRouter, useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

const Homepage = () => {
  const router: NextRouter = useRouter();
  const [roomID, setRoomID] = useState<string>("");

  useEffect(() => {
    if (sessionStorage.getItem("UserName") === null) {
      let name = prompt("Enter your Username");
      window.sessionStorage.setItem("UserName", name ?? "");
    }

    if (sessionStorage.getItem("UserId") === null) {
      window.sessionStorage.setItem("UserId", generateRandomRoomID(12));
    }
  }, []);

  const generateRandomRoomID = (max: number): string =>
    Math.random().toString(20).substr(2, max);

  return (
    <div className="flex flex-col w-full items-center justify-center bg-transparent  h-full">
      <div className="flex flex-col p-3 items-center justify-center gap-5 mt-72">
        <p className="text-8xl text-center text-accent font-extrabold mb-10 font-comfortaa">
          Welcome to <br />
          <span className="text-secondary-600">Nucleus</span>
        </p>
        <div className="form-control">
          <div className="relative">
            <input
              placeholder=""
              className="w-full pr-16 py-4 border-2 tracking-wider bg-transparent border-secondary-600 rounded-2xl text-center focus:outline-none text-xl font-semibold"
              type="text"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
            />
            <button
              className="absolute text-2xl disabled:bg-primary-700 text-button font-semibold h-full px-4  top-0 right-0 rounded-r-2xl bg-secondary-600 hover:bg-secondary"
              onClick={() => {
                router.push("room/" + roomID);
              }}
              disabled={roomID.length == 8 ? false : true}
            >
              Go
            </button>
          </div>
        </div>
        <button
          className=" text-md text-secondary font-semibold focus:outline-none hover:text-secondary-600"
          onClick={() => {
            let id: string = generateRandomRoomID(8);
            router.push("room/" + id);
          }}
        >
          Create new Room
        </button>
      </div>
    </div>
  );
};

export default Homepage;
