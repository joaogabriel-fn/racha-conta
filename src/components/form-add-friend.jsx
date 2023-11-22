import { useState } from 'react';

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

export { FormAddFriend };
