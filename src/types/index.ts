import { EPriority } from "../enums/priority";

export type TOption = {
  label: string;
  value: string;
};

export type TTodo = {
  id: string;
  title: string;
  isDone: boolean;
  priority: EPriority;
};
