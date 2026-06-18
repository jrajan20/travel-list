import { useState } from "react";


// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true }
// ];



export default function App(){
  const [items, setItems] = useState([]);
 



  function addItems(item){
  setItems((i) => [...i,item])
}

function deleteItems(id){

  setItems(items => items.filter((item) => item.id !== id ));
}

function handleToggleItem(id){

  setItems(items => items.map((i)=>
        i.id === id ?  {...i, packed : !i.packed} : i
      ))
    

}
// function updateItems(updatedItems){
//   setItems(updatedItems)
// }
  return (
    <div>
      <Logo/>
      <Form changeItems={addItems}/>
      <PackingList items={items} onDeleteItems={deleteItems} toggleItems={handleToggleItem}/>
      <Stats items={items}/>
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
      const newItem ={description, quantity, packed: false, id: Date.now()};
      
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

  function PackingList({items, onDeleteItems, toggleItems}){

    const [sortBy,setSortBy] = useState("input");
    let sortedItems;

    if(sortBy === "input") sortedItems = items;
    if(sortBy === "description"){
      sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));
    }
    if(sortBy === "packed"){
      sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));
    }
    return (
    <div className="list">
      <ul>
        {sortedItems.map(item => 

          <Item item={item} items={items} deleteItems={onDeleteItems} toggleItems={toggleItems} key={item.id}/>

        )}
        </ul>
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value='input'> Sort by input order</option>
            <option value='description'>Sort by description</option>
            <option value='packed'>Sort by packed</option>
          </select>
        </div>
    </div>
    )
  }

  function Item({item, items, deleteItems, toggleItems}){
    // function handleClick(){
    //   
    
    // }
    return (
    <li>
      <input type="checkbox" value = {item.packed} onChange={()=>{toggleItems(item.id)}}/>
      <span style={item.packed ?{textDecoration: "line-through"}:{}}>{item.quantity} {item.description}</span>
     <button onClick={() => deleteItems(item.id)}>❌</button>
    </li>
    )
  }
  function Stats({items}){
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed ).length;
    const percentage = Math.round(numPacked/numItems * 100);

    if(!items.length){
   
      return(
         <p className="stats">
            Start adding items to your packign list! 🚀
        </p>
      )
    }
    return(
    <footer className="stats">
      {
        percentage === 100 ? 
        "You got everything! You're good to go! ✈️":
        
        `👜 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage})%`
      }
      
    </footer>
    );
  }

