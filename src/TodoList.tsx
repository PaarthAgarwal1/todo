import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";

interface TodoListProps {
  item: string;
  onTaskChange: (item: string) => void;
  checked: boolean;
  deleteItems: (item: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ item, onTaskChange, checked, deleteItems }) => {
  function handleChange() {
    onTaskChange(item);
  }

  return (
    <li className="flex items-center gap-2">
      <button className="hover:text-red-500 hover:bg-white hover:text-lg focus:outline-none focus:ring-0" onClick={() => deleteItems(item)}>
        <CiCircleRemove />
      </button>
      {checked ? (
        <button onClick={handleChange} className="pr-1 text-yellow-600 text-xl focus:outline-none hover:bg-white focus:ring-0">
          <MdCheckBox />
        </button>
      ) : (
        <button onClick={handleChange} className="pr-1 text-gray-400 text-xl focus:outline-none hover:bg-white focus:ring-0">
          <MdCheckBoxOutlineBlank />
        </button>
      )}
      <p className="text-gray-500 font-semibold">{item}</p>
    </li>
  );
}

export default TodoList;
