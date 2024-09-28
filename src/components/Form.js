import { useState } from "react";
export default function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(+e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        value={description}
        placeholder="Item..."
      />
      <button type="text">Add</button>
    </form>
  );
}
