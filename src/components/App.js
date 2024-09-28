import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
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
