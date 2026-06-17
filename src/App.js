import { useState } from "react";


const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true }
];



export default function App(){
  const [items, setItems] = useState(initialItems);

  function addItems(item){
  setItems((i) => [...i,item])
}
function updateItems(updatedItems){
  setItems(updatedItems)
}
  return (
    <div>
      <Logo/>
      <Form changeItems={addItems}/>
      <PackingList items={items} updateItems={updateItems} />
      <Stats/>
    </div>
  )
}

  function Logo(){
    return <h1>🌴 Far Away 👜</h1>
  }

  function Form({changeItems}){

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] =useState(1);

   
    function handleSubmit(e){
      e.preventDefault();
      console.log(e);
      const newItem ={description, quantity, packed: false, date: Date.now()};
      
      console.log(newItem);
      changeItems(newItem);
      setDescription("");
      setQuantity(1);
    }

    return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e)=> setQuantity(Number(e.target.value))}>
        {Array.from({length: 20},(_,i) => i + 1).map(num => (
          <option value={num} key={num}>{num}</option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e)=> setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
    );
  }

  function PackingList({items, updateItems}){
    return (
    <div className="list">
      <ul>
        {items.map(item => 

          <Item item={item} items={items} update={updateItems} key={item.id}/>

        )}
        </ul>
    </div>
    )
  }

  function Item({item, items, update}){
    function handleClick(){
      const updatedItems = items.map((i)=>{
        if (i.id === item.id){
           return {...i, packed : !i.packed}
        }
        return i
      }
      )
      update(updatedItems);
    }
    return (
    <li>
      <span style={item.packed ?{textDecoration: "line-through"}:{}}>{item.quantity} {item.description}</span>
     <button onClick={handleClick}>❌</button>
    </li>
    )
  }
  function Stats(){
    return(
    <footer className="stats">
      <em>👜 You have X items on your list, and you already packed X (X%)</em>
    </footer>
    );
  }

