import { useEffect, useState } from 'react';
import { Logo } from './components/logo';
import { ButtonAddFriend } from './components/button-add-friend';
import { FormAddFriend } from './components/form-add-friend';
import { FormSplitBill } from './components/form-split-bill';
import { ListOfFriends } from './components/ListOfFriends';

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

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [toggleAddFriend, setToggleAddFriend] = useState(false);

  useEffect(() => {
    const pageTitle = selectedFriend
      ? `${selectedFriend.name} foi selecionado(a)`
      : 'Racha-Conta';

    document.title = pageTitle;
  }, [selectedFriend]);

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
