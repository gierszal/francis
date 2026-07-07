"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateCollectionDTO } from "@/types/collection";
import Input from "@/components/ui/Input";
import RoundedButton from "@/components/ui/RoundedButton";
import { updateCollectionSchema } from "@/schemas/collection";
import GradientText from "@/components/motion/GradientText";
import {
  useGetCollection,
  useGetCollections,
  useUpdateCollection,
} from "@/hooks/modules/collection/useCollection";
import SelectItems from "@/components/ui/Select";
import { useEffect, useState } from "react";

interface UpdateCollectionFormProps {
  callbackUrl?: string;
}

const UpdateCollectionForm = ({ callbackUrl }: UpdateCollectionFormProps) => {
  const router = useRouter();
  const [collectionId, setcollectionId] = useState<string>("");
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateCollectionSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: UpdateCollectionDTO) => {
    update(
      { id: collectionId, data: data },
      {
        onSuccess: () => router.replace(callbackUrl ?? "/collections"),
      },
    );
  };

  const { mutate: update, isError, error } = useUpdateCollection();
  const { data: collectionsData } = useGetCollections();
  const { data: collectionData } = useGetCollection(
    collectionId,
    !!collectionId,
  );

  const collections = collectionsData?.items?.data;
  const collection = collectionData?.data?.data;

  useEffect(() => {
    if (!collection) return;
    reset({
      name: collection?.name,
    });
  }, [collection, reset]);

  return (
    <div className="mt-15 gap-7 px-4 flex flex-col items-center w-full">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        Update Collection
      </GradientText>

      <div className="w-full flex flex-row justify-center py-5">
        <SelectItems
          onChange={(id: string) => setcollectionId(id)}
          items={collections}
          placeholder="Select a collection"
          className="w-full"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6"
      >
        <div className="flex items-center gap-4">
          <label
            htmlFor="name"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            Name
          </label>
          <div className="flex-1">
            <Input
              disabled={!collection}
              id="name"
              inputProps={register("name")}
              placeholder="Enter collection name"
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base"
            />
            {errors.name && (
              <span className="text-sm text-red-500 font-medium">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <RoundedButton
          className="w-full text-xl py-3 mt-5"
          disabled={!collection}
        >
          Update collection
        </RoundedButton>
      </form>
    </div>
  );
};

export default UpdateCollectionForm;
