export default function Stats({ items }) {
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
