const FormAddFriend = ({ onSubmitAddFriend }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { newFriendName, newFriendPhoto } = e.target.elements;
    const newFriend = {
      id: crypto.randomUUID(),
      name: newFriendName.value,
      avatar: newFriendPhoto.value,
      balance: +0,
    };
    onSubmitAddFriend(newFriend);
  };

  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>
        🚶🏿 Nome
        <input name="newFriendName" type="text" />
      </label>

      <label>
        📷 Foto
        <input name="newFriendPhoto" type="text" />
      </label>

      <button className="button">Adicionar</button>
    </form>
  );
};

export { FormAddFriend };
