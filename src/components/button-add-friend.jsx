const ButtonAddFriend = ({ toggleAddFriend, onClickAddFriend }) => (
  <button
    onClick={onClickAddFriend}
    className={`button ${toggleAddFriend ? 'button-close' : ''}`}
  >
    {toggleAddFriend ? 'Fechar' : 'Adicionar Amigo(a)'}
  </button>
);

export { ButtonAddFriend };
