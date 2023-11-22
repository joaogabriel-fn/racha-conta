import { useState } from 'react';

const initialFriends = [
  {
    id: crypto.randomUUID(),
    name: 'Antonio',
    avatar: '/imgs/friends/antonio-48.jpg',
    balance: -7,
  },
  {
    id: crypto.randomUUID(),
    name: 'Henrique',
    avatar: '/imgs/friends/henrique-48.jpg',
    balance: +20,
  },
  {
    id: crypto.randomUUID(),
    name: 'Renata',
    avatar: '/imgs/friends/renata-48.jpg',
    balance: +0,
  },
];

const getMsgInfo = (balance) =>
  balance < 0
    ? { message: `Você deve ${Math.abs(balance)} reais`, color: 'red-debit' }
    : balance > 0
    ? { message: `Te deve ${balance} reais`, color: 'green-credit' }
    : { message: `Estão quites`, color: 'white-neutral' };

const Logo = () => (
  <header className="header">
    <img src="/imgs/logo-racha-conta.png" alt="" />
  </header>
);

const ListOfFriends = ({ friends, selectedFriend, onClickFriend }) => (
  <ul>
    {friends.map((friend) => {
      const { message, color } = getMsgInfo(friend.balance);
      const isSelectedFriend = friend.id === selectedFriend?.id;

      return (
        <li key={friend.id}>
          <img src={friend.avatar} alt={`Avatar de ${friend.name}`} />
          <h3>{friend.name}</h3>
          <p className={color}>{message}</p>
          <button
            onClick={() => onClickFriend(friend)}
            className={`button ${isSelectedFriend ? 'button-close' : ''}`}
          >
            {isSelectedFriend ? 'Fechar' : 'Selecionar'}
          </button>
        </li>
      );
    })}
  </ul>
);

const FormAddFriend = ({ toggleAddFriend, onSubmitAddFriend }) => {
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendPhoto, setNewFriendPhoto] = useState('');

  const handleChangeNewFriendName = (e) => setNewFriendName(e.target.value);
  const handleChangeNewFriendPhoto = (e) => setNewFriendPhoto(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFriend = {
      id: crypto.randomUUID(),
      name: newFriendName,
      avatar: newFriendPhoto,
      balance: +0,
    };

    onSubmitAddFriend(newFriend);
    setNewFriendName('');
    setNewFriendPhoto('');
  };

  return (
    toggleAddFriend && (
      <form onSubmit={handleSubmit} className="form-add-friend">
        <label>
          🚶🏿 Nome
          <input
            value={newFriendName}
            onChange={handleChangeNewFriendName}
            type="text"
          />
        </label>

        <label>
          📷 Foto
          <input
            value={newFriendPhoto}
            onChange={handleChangeNewFriendPhoto}
            type="text"
          />
        </label>

        <button className="button">Adicionar</button>
      </form>
    )
  );
};

const ButtonAddFriend = ({ toggleAddFriend, onClickAddFriend }) => (
  <button
    onClick={onClickAddFriend}
    className={`button ${toggleAddFriend ? 'button-close' : ''}`}
  >
    {toggleAddFriend ? 'Fechar' : 'Adicionar Amigo(a)'}
  </button>
);

const FormSplitBill = ({ selectedFriend, onSubmitShareBill }) => {
  const [totalBill, setTotalBill] = useState('100');
  const [mySpend, setMySpend] = useState('50');
  const [whoWillPay, setWhoWillPay] = useState('you');

  const handleChangeBill = (e) => setTotalBill(e.target.value);
  const handleChangeMySpend = (e) => setMySpend(e.target.value);
  const handleChangeWhoWillPay = (e) => setWhoWillPay(e.target.value);

  const handleSubmitShareBill = (e) => {
    e.preventDefault();
    onSubmitShareBill({
      ...selectedFriend,
      balance:
        whoWillPay === 'you'
          ? selectedFriend.balance + (+totalBill - +mySpend)
          : selectedFriend.balance - +mySpend,
    });

    setTotalBill('');
    setMySpend('');
    setWhoWillPay('you');
  };

  return (
    selectedFriend && (
      <form onSubmit={handleSubmitShareBill} className="form-split-bill">
        <h2>Rache a conta com {selectedFriend.name}</h2>

        <label>
          💰 Valor total
          <input type="number" value={totalBill} onChange={handleChangeBill} />
        </label>

        <label>
          🛍️ Seus gastos
          <input type="number" value={mySpend} onChange={handleChangeMySpend} />
        </label>

        <label>
          💸 Quem vai pagar
          <select value={whoWillPay} onChange={handleChangeWhoWillPay}>
            <option value="you">Você</option>
            <option value={selectedFriend.name}>{selectedFriend.name}</option>
          </select>
        </label>

        <button className="button">Rachar Conta</button>
      </form>
    )
  );
};

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [toggleAddFriend, setToggleAddFriend] = useState(false);

  const handleClickAddFriend = () => setToggleAddFriend((prev) => !prev);
  const handleClickFriend = (friend) =>
    setSelectedFriend((prev) => (prev?.id === friend.id ? null : friend));

  const handleSubmitShareBill = (friend) => {
    setFriends((prev) => prev.map((p) => (friend.id === p.id ? friend : p)));
    setSelectedFriend(null);
  };

  const handleSubmitAddFriend = (newFriend) => {
    setFriends((prev) => [...prev, newFriend]);
    setToggleAddFriend(false);
  };

  return (
    <>
      <Logo />

      <main className="app">
        <aside className="sidebar">
          <ListOfFriends
            friends={friends}
            selectedFriend={selectedFriend}
            onClickFriend={handleClickFriend}
          />

          <FormAddFriend
            toggleAddFriend={toggleAddFriend}
            onSubmitAddFriend={handleSubmitAddFriend}
          />

          <ButtonAddFriend
            toggleAddFriend={toggleAddFriend}
            onClickAddFriend={handleClickAddFriend}
          />
        </aside>

        <FormSplitBill
          selectedFriend={selectedFriend}
          onSubmitShareBill={handleSubmitShareBill}
        />
      </main>
    </>
  );
};

export { App };
