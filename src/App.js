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

  setItems(items => items.map((i)=>{
        if (i.id === id){
           return {...i, packed : !i.packed}
        }
        return i
      }));
    

}
// function updateItems(updatedItems){
//   setItems(updatedItems)
// }
  return (
    <div>
      <Logo/>
      <Form changeItems={addItems}/>
      <PackingList items={items} onDeleteItem={deleteItems} toggleItems={handleToggleItem}/>
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

  function PackingList({items, deleteItems, toggleItems}){
    return (
    <div className="list">
      <ul>
        {items.map(item => 

          <Item item={item} items={items} deleteItems={deleteItems} toggleItems={toggleItems} key={item.id}/>

        )}
        </ul>
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
  function Stats(){
    return(
    <footer className="stats">
      <em>👜 You have X items on your list, and you already packed X (X%)</em>
    </footer>
    );
  }

