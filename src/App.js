import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }
  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form({ handleAddItems }) {
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
function PackingList({ items, handleDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} handleDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, key, handleDeleteItem }) {
  return (
    <li key={key}>
      <span style={item.packed ? { textDecoration: "Line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)} type="text">
        ❌
      </button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
