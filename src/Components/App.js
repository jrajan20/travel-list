import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form"
import PackingList from "./PackingList";
import Stats from "./Stats";

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
function clearList(){
  const confirmed = window.confirm('Are you sure you want to delete all items?');
  if (confirmed) setItems([]);
  

}


// function updateItems(updatedItems){
//   setItems(updatedItems)
// }
  return (
    <div>
      <Logo/>
      <Form changeItems={addItems}/>
      <PackingList items={items} onDeleteItems={deleteItems} toggleItems={handleToggleItem} clearList={clearList} />
      <Stats items={items}/>
    </div>
  )
}

  

 


