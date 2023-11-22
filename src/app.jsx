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

const FormAddFriend = ({
  toggleAddFriend,
  onSubmitAddFriend,
  newFriendName,
  onChangeNewFriendName,
  newFriendPhoto,
  onChangeNewFriendPhoto,
}) =>
  toggleAddFriend && (
    <form onSubmit={onSubmitAddFriend} className="form-add-friend">
      <label>
        🚶🏿 Nome
        <input
          value={newFriendName}
          onChange={onChangeNewFriendName}
          type="text"
        />
      </label>

      <label>
        📷 Foto
        <input
          value={newFriendPhoto}
          onChange={onChangeNewFriendPhoto}
          type="text"
        />
      </label>

      <button className="button">Adicionar</button>
    </form>
  );

const ButtonAddFriend = ({ toggleAddFriend, onClickAddFriend }) => (
  <button
    onClick={onClickAddFriend}
    className={`button ${toggleAddFriend ? 'button-close' : ''}`}
  >
    {toggleAddFriend ? 'Fechar' : 'Adicionar Amigo(a)'}
  </button>
);

const FormSplitBill = ({
  selectedFriend,
  onSubmitShareBill,
  totalBill,
  onChangeBill,
  mySpend,
  onChangeMySpend,
  whoWillPay,
  onChangeWhoWillPay,
}) =>
  selectedFriend && (
    <form onSubmit={onSubmitShareBill} className="form-split-bill">
      <h2>Rache a conta com {selectedFriend.name}</h2>

      <label>
        💰 Valor total
        <input type="number" value={totalBill} onChange={onChangeBill} />
      </label>

      <label>
        🛍️ Seus gastos
        <input type="number" value={mySpend} onChange={onChangeMySpend} />
      </label>

      <label>
        💸 Quem vai pagar
        <select value={whoWillPay} onChange={onChangeWhoWillPay}>
          <option value="you">Você</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
      </label>

      <button className="button">Rachar Conta</button>
    </form>
  );

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const [totalBill, setTotalBill] = useState('100');
  const [mySpend, setMySpend] = useState('50');
  const [whoWillPay, setWhoWillPay] = useState('you');

  const [toggleAddFriend, setToggleAddFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendPhoto, setNewFriendPhoto] = useState('');

  const handleClickFriend = (friend) =>
    setSelectedFriend((prev) => (prev?.id === friend.id ? null : friend));

  const handleChangeBill = (e) => setTotalBill(e.target.value);
  const handleChangeMySpend = (e) => setMySpend(e.target.value);
  const handleChangeWhoWillPay = (e) => setWhoWillPay(e.target.value);

  const handleClickAddFriend = () => setToggleAddFriend((prev) => !prev);
  const handleChangeNewFriendName = (e) => setNewFriendName(e.target.value);
  const handleChangeNewFriendPhoto = (e) => setNewFriendPhoto(e.target.value);

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
                  : friend.balance - +mySpend,
            }
          : friend,
      ),
    );

    setSelectedFriend(null);
    setTotalBill('');
    setMySpend('');
    setWhoWillPay('you');
  };

  const handleSubmitAddFriend = (e) => {
    e.preventDefault();

    setFriends((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newFriendName,
        avatar: newFriendPhoto,
        balance: +0,
      },
    ]);

    setNewFriendName('');
    setNewFriendPhoto('');
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
            newFriendName={newFriendName}
            onChangeNewFriendName={handleChangeNewFriendName}
            newFriendPhoto={newFriendPhoto}
            onChangeNewFriendPhoto={handleChangeNewFriendPhoto}
          />

          <ButtonAddFriend
            toggleAddFriend={toggleAddFriend}
            onClickAddFriend={handleClickAddFriend}
          />
        </aside>

        <FormSplitBill
          selectedFriend={selectedFriend}
          onSubmitShareBill={handleSubmitShareBill}
          totalBill={totalBill}
          onChangeBill={handleChangeBill}
          mySpend={mySpend}
          onChangeMySpend={handleChangeMySpend}
          whoWillPay={whoWillPay}
          onChangeWhoWillPay={handleChangeWhoWillPay}
        />
      </main>
    </>
  );
};

export { App };
