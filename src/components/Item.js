export default function Item({ item, key, handleDeleteItem, handlePacked }) {
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
