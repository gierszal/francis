"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetAlbum,
  useGetAlbums,
  useRemoveAlbum,
} from "@/hooks/modules/album/useAlbum";
import RoundedButton from "@/components/ui/RoundedButton";
import GradientText from "@/components/motion/GradientText";
import SelectItems from "@/components/ui/Select";
import { useState } from "react";
import {
  useGetGame,
  useGetGames,
  useRemoveGame,
} from "@/hooks/modules/game/useGame";

interface RemoveGameFormProps {
  callbackUrl?: string;
}

const RemoveGameForm = ({ callbackUrl }: RemoveGameFormProps) => {
  const router = useRouter();
  const [gameId, setGameId] = useState<string>("");

  const onClick = () => {
    remove(
      { id: gameId },
      {
        onSuccess: () => router.replace(callbackUrl ?? "/games"),
      },
    );
  };

  const { mutate: remove, isError, error } = useRemoveGame();
  const { data: gamesData } = useGetGames();
  const { data: gameData } = useGetGame(gameId, !!gameId);

  const games = gamesData?.items?.data;
  const game = gameData?.data?.data;

  return (
    <div className="mt-10 flex flex-col items-center w-full">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        Delete Game
      </GradientText>

      <div className="w-full flex flex-row justify-center py-5">
        <SelectItems
          onChange={(id: string) => setGameId(id)}
          items={games}
          placeholder="Select a game"
          className="w-full"
        />
      </div>

      <RoundedButton
        className="w-[20%] text-xl py-3 mt-5"
        disabled={!game}
        onClick={onClick}
      >
        Delete Game
      </RoundedButton>
    </div>
  );
};

export default RemoveGameForm;
