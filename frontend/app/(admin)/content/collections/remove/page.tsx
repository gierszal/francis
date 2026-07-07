"use client";

import { useRouter } from "next/navigation";
import RoundedButton from "@/components/ui/RoundedButton";
import GradientText from "@/components/motion/GradientText";
import SelectItems from "@/components/ui/Select";
import { useState } from "react";
import {
  useGetCollection,
  useGetCollections,
  useRemoveCollection,
} from "@/hooks/modules/collection/useCollection";

interface RemoveCollectionFormProps {
  callbackUrl?: string;
}

const RemoveCollectionForm = ({ callbackUrl }: RemoveCollectionFormProps) => {
  const router = useRouter();
  const [collectionId, setCollectionId] = useState<string>("");

  const onClick = () => {
    remove(
      { id: collectionId },
      {
        onSuccess: () => router.replace(callbackUrl ?? "/collections"),
      },
    );
  };

  const { mutate: remove, isError, error } = useRemoveCollection();
  const { data: collectionsData } = useGetCollections();
  const { data: collectionData } = useGetCollection(
    collectionId,
    !!collectionId,
  );

  const collections = collectionsData?.items?.data;
  const collection = collectionData?.data?.data;

  return (
    <div className="mt-15 gap-7 px-4 flex flex-col items-center w-full">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        Delete Collection
      </GradientText>

      <div className="w-full flex flex-row justify-center py-5">
        <SelectItems
          onChange={(id: string) => setCollectionId(id)}
          items={collections}
          placeholder="Select a collection"
          className="w-full"
        />
      </div>

      <RoundedButton
        className="min-w-[30%] text-xl py-3 mt-5"
        disabled={!collection}
        onClick={onClick}
      >
        Delete Collection
      </RoundedButton>
    </div>
  );
};

export default RemoveCollectionForm;
