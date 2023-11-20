const initialFriends = [
  {
    id: crypto.randomUUID(),
    name: 'Antonio',
    avatar: '/imgs/friends/antonio-48.jpg',
    balance: +0,
    displayMessage: 'Estão quites',
    selected: false,
  },
  {
    id: crypto.randomUUID(),
    name: 'Henrique',
    avatar: '/imgs/friends/henrique-48.jpg',
    balance: +0,
    displayMessage: 'Estão quites',
    selected: false,
  },
  {
    id: crypto.randomUUID(),
    name: 'Renata',
    avatar: '/imgs/friends/renata-48.jpg',
    balance: +0,
    displayMessage: 'Estão quites',
    selected: false,
  },
];

const App = () => (
  <>
    <header className="header">
      <img src="/imgs/logo-racha-conta.png" alt="" />
    </header>

    <main className="app">
      <aside className="sidebar">
        <ul>
          {initialFriends.map((friend) => (
            <li key={friend.id}>
              <img src={friend.avatar} alt={`Avatar de ${friend.name}`} />
              <h3>{friend.name}</h3>
              <p>{friend.displayMessage}</p>
              <button className="button">Selecionar</button>
            </li>
          ))}
        </ul>

        <button className="button">Adicionar Amigue</button>
      </aside>

      {true && (
        <form className="form-split-bill">
          <h2>Rache a conta com Antônio</h2>

          <label>
            💰 Valor total
            <input type="text" />
          </label>

          <label>
            🛍️ Seus gastos
            <input type="text" />
          </label>

          <label>
            💸 Quem vai pagar
            <select name="payer">
              <option value="me">Você</option>
              <option value="friend">Amigo</option>
            </select>
          </label>

          <button className="button">Rachar Conta</button>
        </form>
      )}
    </main>
  </>
);

export { App };
