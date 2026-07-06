import RoundedButton from "../ui/RoundedButton";
import { FormattedUser, UpdateUserDTO } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/schemas/user";
import Input from "../ui/Input";
import { useUpdateProfile } from "@/hooks/modules/user/useUser";
import { useRouter } from "next/navigation";

interface EditProfileFormProps {
  user: FormattedUser;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<UpdateUserDTO>({
    resolver: zodResolver(updateUserSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: UpdateUserDTO) => {
    update(data, {
      onSuccess: () => router.replace("/profile"),
    });
  };

  const { mutate: update, isError, error } = useUpdateProfile();

  return (
    <div className="mt-10 flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6"
      >
        <div className="flex items-center gap-4">
          <label
            htmlFor="firstName"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            First name
          </label>
          <div className="flex-1">
            <Input
              id="firstName"
              ariaInvalid={!!errors.firstName}
              ariaDescribedby="firstName-error"
              inputProps={register("firstName")}
              placeholder="Enter your first name"
              defaultValue={user.first_name}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base"
            />
            {errors.firstName && (
              <span className="text-sm text-red-500 font-medium">
                {errors.firstName.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label
            htmlFor="lastName"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            Last name
          </label>
          <div className="flex-1">
            <Input
              inputProps={register("lastName")}
              id="lastName"
              ariaInvalid={!!errors.lastName}
              ariaDescribedby="lastName-error"
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base"
              placeholder="Enter your last name"
              defaultValue={user.last_name}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500 font-medium">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label
            htmlFor="email"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            Email
          </label>
          <div className="flex-1">
            <Input
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base bg-gray-100 cursor-not-allowed"
              disabled={true}
              defaultValue={user.email}
            />
          </div>
        </div>

        <RoundedButton className="w-full text-xl py-3 mt-5">
          Submit
        </RoundedButton>
      </form>
    </div>
  );
};

export default EditProfileForm;
