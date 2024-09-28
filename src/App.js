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
  function handlePacked(id) {
    const newItems = items.map((item) => {
      return item.id === id ? { ...item, packed: !item.packed } : item;
    });

    setItems(newItems);
  }
  function handleErase(e) {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handlePacked={handlePacked}
        handleDeleteItem={handleDeleteItem}
        handleErase={handleErase}
      />
      <Stats items={items} />
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
function PackingList({ items, handleDeleteItem, handlePacked, handleErase }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            handlePacked={handlePacked}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleErase}>Clear</button>
      </div>
    </div>
  );
}
function Item({ item, key, handleDeleteItem, handlePacked }) {
  return (
    <li key={key}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handlePacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "Line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)} type="text">
        ❌
      </button>
    </li>
  );
}
function Stats({ items }) {
  const numItems = items.length;
  if (numItems === 0)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀 </em>
      </p>
    );
  let alreadyPacked = 0;
  items.forEach((item) => {
    if (item.packed) alreadyPacked += 1;
  });
  const percentage = Math.ceil((alreadyPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You got everything! Ready to go ✈`
          : `💼 You have ${numItems} items on your list, and you already packed
            ${alreadyPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
