import AnimatedDiv from "@/components/motion/AnimatedDiv";
import Magnet from "@/components/motion/Magnet";
import MotionImage from "@/components/motion/MotionImage";

const Contribution = () => {
  return (
    <div className="rounded-lg w-full h-full overflow-hidden">
      <MotionImage
        src="/heros/river2.jpg"
        width={1920}
        height={1080}
        alt="pic"
        className="w-full h-full object-cover brightness-70 "
      />
      <AnimatedDiv className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col w-full items-center justify-center gap-10">
          <div
            className="
      max-w-[60%]
      bg-black/1 backdrop-blur-xs
       sm:px-6 sm:py-4 md:px-8 md:py-5
      rounded-2xl border border-white/10 shadow-xl
      flex flex-wrap justify-center items-center gap-3 sm:gap-4
      text-white font-sans text-3xl sm:text-4xl md:text-5xl
    "
          >
            <h1>Project Contribution</h1>
          </div>
          <div className="font-mono text-white font-semibold text-md border-red-200 max-w-[40%] break-normal flex flex-wrap">
            This platform was created completely for free, and as the final
            project for our SP course, it's still a work in progress. In short,
            if you'd like to support us — just listen to our music and tell your
            friend about us!
          </div>

          <Magnet
            padding={50}
            disabled={false}
            magnetStrength={5}
            href="https://github.com/gierszal/francis"
          >
            <div className="text-white bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 p-2 rounded-md cursor-pointer">
              Star Francis on GitHub!
            </div>
          </Magnet>
        </div>
      </AnimatedDiv>
    </div>
  );
};

export default Contribution;
