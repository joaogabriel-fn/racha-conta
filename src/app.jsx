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

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const [totalBill, setTotalBill] = useState('100');
  const [mySpend, setMySpend] = useState('50');
  const [whoWillPay, setWhoWillPay] = useState('you');

  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendPhoto, setNewFriendPhoto] = useState('');
  const [addFriend, setAddFriend] = useState(false);
  const [friendToAdd, setFriendToAdd] = useState({ balance: +0 });

  const handleClickFriend = (friend) =>
    setSelectedFriend((p) => (p?.id === friend.id ? null : friend));
  const handleChangeBill = (e) => setTotalBill(e.target.value);
  const handleChangeMySpend = (e) => setMySpend(e.target.value);
  const handleChangeWhoWillPay = (e) => setWhoWillPay(e.target.value);

  const handleNewFriendName = (e) => setNewFriendName(e.target.value);
  const handleNewFriendPhoto = (e) => setNewFriendPhoto(e.target.value);
  const handleAddFriend = () => setAddFriend((prev) => !prev);
  const handleFriendToAdd = () =>
    setFriendToAdd((prev) => ({
      ...prev,
      id: crypto.randomUUID(),
      name: newFriendName,
      avatar: newFriendPhoto,
    }));

  const handleSubmitShareBill = (e) => {
    e.preventDefault();

    setFriends((prev) =>
      prev.map((friend) =>
        selectedFriend.id === friend.id
          ? {
              ...friend,
              balance:
                whoWillPay === 'you'
                  ? friend.balance + (+totalBill - +mySpend)
                  : friend.balance - mySpend,
            }
          : friend,
      ),
    );
  };

  const handleSubmitAddFriend = (e) => {
    e.preventDefault();
    handleAddFriend();
    setFriends((prev) => [...prev, friendToAdd]);
  };

  return (
    <>
      <header className="header">
        <img src="/imgs/logo-racha-conta.png" alt="" />
      </header>

      <main className="app">
        <aside className="sidebar">
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
                    onClick={() => handleClickFriend(friend)}
                    className={`button ${
                      isSelectedFriend ? 'button-close' : ''
                    }`}
                  >
                    {isSelectedFriend ? 'Fechar' : 'Selecionar'}
                  </button>
                </li>
              );
            })}
          </ul>

          {addFriend && (
            <form onSubmit={handleSubmitAddFriend} className="form-add-friend">
              <label>
                🚶🏿 Nome
                <input onChange={handleNewFriendName} type="text" />
              </label>

              <label>
                📷 Foto
                <input onChange={handleNewFriendPhoto} type="text" />
              </label>

              <button onClick={handleFriendToAdd} className="button">
                Adicionar
              </button>
            </form>
          )}

          <button
            onClick={handleAddFriend}
            className={`button ${addFriend ? 'button-close' : ''}`}
          >
            {addFriend ? 'Fechar' : 'Adicionar Amigo(a)'}
          </button>
        </aside>

        {selectedFriend && (
          <form onSubmit={handleSubmitShareBill} className="form-split-bill">
            <h2>Rache a conta com {selectedFriend.name}</h2>

            <label>
              💰 Valor total
              <input
                type="number"
                value={totalBill}
                onChange={handleChangeBill}
              />
            </label>

            <label>
              🛍️ Seus gastos
              <input
                type="number"
                value={mySpend}
                onChange={handleChangeMySpend}
              />
            </label>

            <label>
              💸 Quem vai pagar
              <select value={whoWillPay} onChange={handleChangeWhoWillPay}>
                <option value="you">Você</option>
                <option value={selectedFriend.name}>
                  {selectedFriend.name}
                </option>
              </select>
            </label>

            <button className="button">Rachar Conta</button>
          </form>
        )}
      </main>
    </>
  );
};

export { App };
