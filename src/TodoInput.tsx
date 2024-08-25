import React, { useState } from 'react';
type TodoInputProps = {
  addList: (item: string) => void;
}
const TodoInput: React.FC<TodoInputProps> = ({ addList }) => {
  const [input, setInput] = useState<string>('');
  const [add, setAdd] = useState<boolean>(false);
  function handleAdd() {
    setAdd(true);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  function handleSave() {
    if (input.trim()) {
      addList(input);
      setInput('');
    }
  }
  function handleCancel() {
    setInput('');
    setAdd(false);
  }
  if (!add) {
    return (
      <div className="pt-6">
        <button onClick={handleAdd} className="bg-yellow-500 rounded-full px-2 py-1 text-white shadow font-semibold focus:outline-none focus:ring-0" > + Add a todo</button>
      </div>
    );
  }
  return (
    <div className='pt-6'>
      {!add && <button onClick={handleCancel} className="bg-yellow-300 rounded-md focus:outline-none focus:ring-0" >Cancle</button>}
      {add && (
        <div className='flex flex-col w-11/12 gap-4 p-4 shadow rounded-md '>
          <h1 className='text-2xl font-bold'>Create a todo</h1>
          <input type="text" value={input} placeholder="Write your todo" className='px-2 py-1 w-64 border rounded focus:border-yellow-500 focus:outline-0 focus:border-2 focus:outline-none focus:ring-0' onChange={handleChange} />
          <div>
            <button onClick={handleSave} className="bg-yellow-500 text-white px-4 py-1 rounded shadow mr-4 focus:outline-none focus:ring-0">Save</button>
            <button onClick={handleCancel} className="border px-4 py-1 rounded shadow focus:outline-none focus:ring-0">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default TodoInput;