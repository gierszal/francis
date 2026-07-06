"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import RoundedButton from "@/components/ui/RoundedButton";
import GradientText from "@/components/motion/GradientText";
import { CreateCollectionDTO } from "@/types/collection";
import { createCollectionSchema } from "@/schemas/collection";
import { useCreateCollection } from "@/hooks/modules/collection/useCollection";

interface CreateCollectionFormProps {
  callbackUrl?: string;
}

const CreateCollectionForm = ({ callbackUrl }: CreateCollectionFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCollectionDTO>({
    resolver: zodResolver(createCollectionSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: CreateCollectionDTO) => {
    create(data, {
      onSuccess: () => router.push(callbackUrl ?? "/collections"),
    });
  };

  const { mutate: create, isError, error } = useCreateCollection();

  return (
    <div className="mt-10 flex flex-col items-center">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        Create collection
      </GradientText>
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

        <RoundedButton className="w-full text-xl py-3 mt-5">
          Create collection
        </RoundedButton>
      </form>
    </div>
  );
};

export default CreateCollectionForm;
