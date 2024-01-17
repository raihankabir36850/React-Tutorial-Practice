import { useState } from 'react';
import { initialFriends } from './static/Data';

function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [addFriend, setAddFriend] = useState(false);
  const [splitBill, setSplitBill] = useState(null);
  const [newUser, setNewUser] = useState(initialFriends);

  function addFormHandler(e) {
    setAddFriend(!addFriend);
  }

  function splitBillHandler(friend) {
    setSplitBill((current) => (current?.id === friend.id ? null : friend));
    setAddFriend(false);
  }

  function splitBillCalculation(value) {
    console.log(value);
    setNewUser((friends) => friends.map((friend) => (friend.id === splitBill.id ? { ...friend, balance: friend.balance + value } : friend)));
    setSplitBill(null);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <Friends data={newUser} splitBillHandler={splitBillHandler} splitBill={splitBill} />

        {addFriend && <FormAddFriend setAddFriend={setAddFriend} setNewUser={setNewUser} />}

        <div className='button-container'>
          <Button onClick={(e) => addFormHandler(e)}>{addFriend ? 'Close' : 'Add Friend'}</Button>
        </div>
      </div>
      {splitBill && <SplitBillForm selectedFriend={splitBill} splitBillCalculation={splitBillCalculation} key={splitBill.id} />}
    </div>
  );
}

function Friends({ data, splitBillHandler, splitBill }) {
  return (
    <ul>
      {data.map((friend) => (
        <Friend key={friend.id} friend={friend} splitBill={splitBill} splitBillHandler={splitBillHandler} />
      ))}
    </ul>
  );
}

function Friend({ friend, splitBill, splitBillHandler }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className='red'>
          You owe {friend.name} Tk. {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} owes you Tk.{friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => splitBillHandler(friend)}>{splitBill === friend ? 'Close' : 'Select'}</Button>
    </li>
  );
}

function FormAddFriend({ setAddFriend, setNewUser }) {
  const [initialName, setInitialName] = useState('');

  function addFriendHandler(e) {
    e.preventDefault();

    if (!initialName) return;

    const newFriend = {
      id: crypto.randomUUID(),
      name: initialName,
      image: `https://i.pravatar.cc/48?u=${crypto.randomUUID()}}`,
      balance: 0,
    };

    setNewUser((friends) => [...friends, newFriend]);
    setAddFriend((prev) => false);
  }

  return (
    <form className='form-add-friend' onSubmit={(e) => addFriendHandler(e)}>
      <label>👫 Friend name</label>
      <input type='text' value={initialName} onChange={(e) => setInitialName(e.target.value)} />

      <label>🌄 Image URL</label>
      <input type='text' value='https://i.pravatar.cc/48' disabled />
      <Button>Add</Button>
    </form>
  );
}

function SplitBillForm({ selectedFriend, splitBillCalculation }) {
  const [total, setTotal] = useState('');
  const [myMoney, setMyMoney] = useState('');
  const [whosebill, setWhosebill] = useState('user');

  const friendMoney = total ? total - myMoney : '';

  function ownMoneyHandler(value) {
    setMyMoney(value);
  }

  function splitBillHandler(e) {
    e.preventDefault();
    if (!total || !myMoney) return;

    if (whosebill === 'user') {
      splitBillCalculation(friendMoney);
    } else {
      splitBillCalculation(-myMoney);
    }
  }

  return (
    <form className='form-split-bill' onSubmit={(e) => splitBillHandler(e)}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input type='text' value={total} onChange={(e) => setTotal(Number(e.target.value))} />
      <label>🧍&zwj;♀️ Your expense</label>
      <input type='text' value={myMoney} onChange={(e) => ownMoneyHandler(Number(e.target.value) > total ? myMoney : Number(e.target.value))} />
      <label>👫 {selectedFriend.name}'s expense</label>
      <input type='text' disabled value={friendMoney} />
      <label>🤑 Who is paying the bill</label>
      <select value={whosebill} onChange={(e) => setWhosebill(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <button className='button'>Split bill</button>
    </form>
  );
}

export default App;
