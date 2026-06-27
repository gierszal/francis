// "use client";
import Image from "next/image";
import { useState } from "react";
import { BsFillPlayFill, BsHeart } from "react-icons/bs";
import { BsFillSkipStartFill } from "react-icons/bs";
import { BsFillSkipEndFill } from "react-icons/bs";
import { BsFillPauseFill } from "react-icons/bs";
import { BsFillHeartFill, BsHeartFill } from "react-icons/bs";
import AnimatedDiv from "../motion/AnimatedDiv";
import { Slider } from "antd";
import { BsVolumeDown, BsVolumeMute, BsVolumeUp } from "react-icons/bs";
import VolumeAdjuster from "./VolumeAdjuster";

const MusicWidget = () => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const handleFlow = () => {
    setIsPaused((prev) => !prev);
  };

  const handleFavourite = () => {
    setIsFavourite((prev) => !prev);
  };

  return (
    <AnimatedDiv className="w-full bg-background flex items-center justify-center">
      <div className="fixed bottom-5 h-20 w-[90%] bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/10 shadow-2xl z-50">
        <div className="absolute -top-4 left-4 right-4">
          <Slider
            styles={{
              track: {
                background: "linear-gradient(to right, #c084fc, #f472b6)",
              },
              rail: { background: "#d9d9d9" },
            }}
            defaultValue={30}
            className="w-[99%] color-red-500 rounded-lg"
            max={100}
          />
        </div>

        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-row gap-5 items-center ">
            {/* <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 overflow-hidden shadow-lg"> */}
            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg -mt-1 ">
              <Image
                width={30}
                height={30}
                src="/misc/towns.webp"
                alt="cover"
                className="w-full h-full object-cover"
              />
            </div>
            {/* </div> */}

            <div>
              <h3 className="text-black font-semibold text-sm truncate">
                River Sasau Theme
              </h3>
              <p className="text-gray-400 text-xs truncate">
                Kingdom Come: Deliverance
              </p>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button className="text-gray-300 hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer">
              <BsFillSkipStartFill size={32} />
            </button>

            <button
              className="text-white hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer"
              onClick={handleFlow}
            >
              {isPaused ? (
                <BsFillPlayFill size={32} />
              ) : (
                <BsFillPauseFill size={32} />
              )}
            </button>

            <button className="text-gray-300 hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer">
              <BsFillSkipEndFill size={32} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* <span className="text-gray-400 text-[10px] font-mono">1:24</span> */}

            {/* <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group"> */}
            {/* <div className="w-1/3 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full relative group-hover:h-1.5 transition-all"> */}
            {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"> */}

            {/* <span className="text-gray-400 text-[10px] font-mono">3:45</span> */}

            <div className="flex flex-row items-center gap-1 ">
              <button
                className="text-gray-400 hover:text-red-400 transition-colors ml-1 p-1 active:scale-105 cursor-pointer"
                onClick={handleFavourite}
              >
                {isFavourite ? (
                  <BsHeartFill color="red" size={24} />
                ) : (
                  <BsHeart size={24} />
                )}
              </button>
              <div className="group">
                {/* <VolumeAdjuster
                  leftIcon={<BsVolumeMute size={20} />}
                  rightIcon={<BsVolumeUp size={20} />}
                  startingValue={0}
                  defaultValue={50}
                  maxValue={100}
                  isStepped={false}
                  stepSize={1}
                  className="hidden group-hover:block text-white fixed bottom-10 right-5"
                /> */}
                <div className="fixed bottom-16 rounded-2xl mb-[-10] ml-[-4]  bg-gray-700 hidden group-hover:block">
                  <div className="flex ml-2 flex-col border-red-500 h-40 w-10 ">
                    <Slider vertical defaultValue={30} />
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors p-1">
                  <BsVolumeDown size={36} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default MusicWidget;
