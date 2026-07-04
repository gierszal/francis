import { FieldValues, UseFormSetValue } from "react-hook-form";

export interface AIGenerateSchema {
  topic: string;
  item: any;
}

export type SetValueType<T extends FieldValues = FieldValues> = UseFormSetValue<
  T & { description: string }
>;
