import { AuthForm } from "@/components/auth/AuthForm";
import AnimatedDiv from "@/components/motion/AnimatedDiv";
import Image from "next/image";

const Auth = () => {
  return (
    <div className="relative rounded-lg w-full h-full min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/heros/river2.jpg"
          alt="pic"
          className="brightness-70"
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center w-full h-full min-h-screen">
        <AnimatedDiv>
          <AuthForm />
        </AnimatedDiv>
      </div>
    </div>
  );
};

export default Auth;
