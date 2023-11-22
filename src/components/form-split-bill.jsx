import { useState } from 'react';

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

export { FormSplitBill };
