export default function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round(numPacked / numItems * 100);

  if (!items.length) {

    return (
      <p className="stats">
        Start adding items to your packign list! 🚀
      </p>
    );
  }
  return (
    <footer className="stats">
      {percentage === 100 ?
        "You got everything! You're good to go! ✈️" :

        `👜 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage})%`}

    </footer>
  );
}
