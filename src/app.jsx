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

const App = () => (
  <>
    {/* <header className="header">
      <img src="/imgs/logo-racha-conta.png" alt="" />
    </header> */}

    <main className="app">
      <aside className="sidebar">
        <ul>
          {initialFriends.map((friend) => {
            const { message, color } = getMsgInfo(friend.balance);

            return (
              <li key={friend.id}>
                <img src={friend.avatar} alt={`Avatar de ${friend.name}`} />
                <h3>{friend.name}</h3>
                <p className={color}>{message}</p>
                <button className="button">Selecionar</button>
              </li>
            );
          })}
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

// const App = () => (
//   <>
//     <header className="header">
//       <img src="/imgs/logo-racha-conta.png" alt="" />
//     </header>

//     <main className="app">
//       <aside className="sidebar">
//         <ul>
//           {initialFriends.map((friend) => (
//             <li key={friend.id}>
//               <img src={friend.avatar} alt={`Avatar de ${friend.name}`} />
//               <h3>{friend.name}</h3>
//               <p>{friend.displayMessage}</p>
//               <button className="button">Selecionar</button>
//             </li>
//           ))}
//         </ul>

//         <button className="button">Adicionar Amigue</button>
//       </aside>

//       {true && (
//         <form className="form-split-bill">
//           <h2>Rache a conta com Antônio</h2>

//           <label>
//             💰 Valor total
//             <input type="text" />
//           </label>

//           <label>
//             🛍️ Seus gastos
//             <input type="text" />
//           </label>

//           <label>
//             💸 Quem vai pagar
//             <select name="payer">
//               <option value="me">Você</option>
//               <option value="friend">Amigo</option>
//             </select>
//           </label>

//           <button className="button">Rachar Conta</button>
//         </form>
//       )}
//     </main>
//   </>
// );
