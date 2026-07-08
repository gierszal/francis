"use client";

import GradientText from "@/components/motion/GradientText";
import UpdatePlaylistForm from "@/components/playlist/UpdatePlaylistForm";
import RoundedButton from "@/components/ui/RoundedButton";
import { useGetPlaylist } from "@/hooks/modules/playlist/usePlaylist";
import { useTranslations } from "next-intl";
// import UpdatePlaylistForm from "@/components/user/UpdatePlaylistForm";
import { useParams, useRouter } from "next/navigation";

const UpdatePlaylist = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const t = useTranslations("pages.EditPlaylistPage");

  const router = useRouter();

  const { data } = useGetPlaylist(id);

  const playlist = data?.data?.data ?? data;

  return (
    <div className="mt-15 gap-7 px-4 flex flex-col">
      <div className="flex flex-col items-start gap-5">
        <GradientText
          colors={["#5227FF", "#FF9FFC", "#B497CF"]}
          animationSpeed={8}
          showBorder={false}
          className="text-5xl ml-10"
        >
          {t("edit")}
        </GradientText>
        <RoundedButton className="text-lg ml-10" onClick={() => router.back()}>
          {t("back")}
        </RoundedButton>
      </div>
      <div>
        <UpdatePlaylistForm playlist={playlist} />
      </div>
    </div>
  );
};

export default UpdatePlaylist;
