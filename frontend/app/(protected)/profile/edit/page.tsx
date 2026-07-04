"use client";

import RoundedButton from "@/components/ui/RoundedButton";
import EditProfileForm from "@/components/user/EditProfileForm";
import { useGetUser } from "@/hooks/modules/user/useUser";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();

  const { data } = useGetUser();

  const user = data?.data?.data ?? data;

  return (
    <div className="mt-10 ml-10">
      <RoundedButton className="text-lg" onClick={() => router.back()}>
        Go back
      </RoundedButton>
      <div>
        <EditProfileForm user={user} />
      </div>
    </div>
  );
};

export default EditProfile;
