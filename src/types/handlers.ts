import { DropResult } from "react-beautiful-dnd";
import { EPriority } from "../enums/priority";
import { TFilterState, TSortState } from "../App";

// Todos handlers types
export type TOnCreateTodo = (title: string) => void;
export type TOnEditTodo = (id: string, title: string) => void;
export type TOnDeleteTodo = (id: string) => void;
export type TOnDoneTodo = (id: string) => void;
export type TOnChangePriorityTodo = (id: string, priority: EPriority) => void;
export type TOnDragTodo = (result: DropResult) => void;

// Filters
export type TOnSort = (newOption: TSortState) => void;
export type TOnFilter = (newOptions: TFilterState) => void;
export type TOnSearch = (search: string) => void;
