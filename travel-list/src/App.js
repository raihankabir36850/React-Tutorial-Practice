import { useState } from 'react';
import "./index.css";
import LogoContainer from './Components/LogoContainer';
import FormContainer from './Components/FormContainer';
import ListContainer from './Components/ListContainer';
import FooterContainer from './Components/FooterContainer';



export default function App() {
  const [lists, setLists] = useState([]);

  const addItemHandler = (item) => {
    setLists(items => [...items, item]);
  };

  const cancelItemsHandler = (e, id = null) => {
    if (!id) {
      setLists([]);
      return;
    }
    const itemLists = [...lists];
    const modifiedLists = itemLists.filter((item) => item.id !== id);
    setLists(modifiedLists);
  };

  const handleToggleItem = (id) => {
    setLists(items => items.map((item) => item.id === id ? { ...item, isPacked: !item.isPacked } : item));
  };


  return (
    <div className="App">
      <LogoContainer />
      <FormContainer addItemHandler={addItemHandler} />
      <ListContainer data={lists} cancelItemsHandler={cancelItemsHandler} onToggleItems={handleToggleItem} />
      <FooterContainer data={lists} />
    </div>
  );
}










