import React, { useState } from 'react';
import MoneyInPieChart from './MoneyInPieChart';
import MoneyInSourcePieChart from './MoneyInSourcePieChart';
import dxbtLogo from '../../assets/logo.png';

export default function MoneyIn({ transactions, setTransactions }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [certainty, setCertainty] = useState('Present');
  const [error, setError] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    if (!source.trim() || !amount || isNaN(Number(amount)) || !certainty) {
      setError('All fields are required and amount must be a number.');
      return;
    }
    setTransactions(prev => [
      ...prev,
      { id: Date.now(), source: source.trim(), amount: Number(amount), certainty }
    ]);
    setSource('');
    setAmount('');
    setCertainty('Present');
    setError('');
    setModalOpen(false);
  }
  function handleRemove(id) {
    setTransactions(prev => prev.filter(txn => txn.id !== id));
  }

  return (
    <div className="dxbt-moneyin-section luxury-bg">
      <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'0.7em'}}>
        <img src={dxbtLogo} alt="DXBT Logo" style={{maxWidth:'350px', marginBottom:'0.6em', display:'block'}} />
      </div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5em'}}>
        <h3 style={{fontFamily:'Playfair Display', fontWeight:700, fontSize:'2rem', letterSpacing:'1px'}}>Money In</h3>
        <button className="dxbt-add-btn" onClick={()=>setModalOpen(true)}>+ Add Money In</button>
      </div>
      <div className="dxbt-moneyin-table-outer luxury-card glass">
        <table className="dxbt-moneyin-table">
          <thead>
            <tr>
              <th>Certainty</th>
              <th>Source</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td colSpan={4} style={{textAlign:'center', opacity:0.7}}>No entries yet.</td></tr>
            ) : transactions.map(txn => (
              <tr key={txn.id}>
                <td><span className="dxbt-certainty-pill">{txn.certainty}</span></td>
                <td>{txn.source}</td>
                <td>₹ {txn.amount.toLocaleString()}</td>
                <td><button className="dxbt-remove-btn" onClick={()=>handleRemove(txn.id)} title="Remove">×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dxbt-piecharts-row">
        <div className="dxbt-piechart-col">
          <div className="dxbt-piechart-heading">By Certainty</div>
          <MoneyInPieChart transactions={transactions} />
        </div>
        <div className="dxbt-piechart-col">
          <div className="dxbt-piechart-heading">By Source</div>
          <MoneyInSourcePieChart transactions={transactions} />
        </div>
      </div>
      <div className="dxbt-moneyin-total luxury-pill" style={{marginTop:'1.7em', fontWeight:600, fontSize:'1.14rem'}}>
        <span>Total Income:</span> ₹ {transactions.reduce((sum, t) => sum + Number(t.amount), 0).toLocaleString()}
      </div>
      {modalOpen && (
        <div className="dxbt-modal-overlay" onClick={()=>setModalOpen(false)}>
          <div className="dxbt-modal luxury-card glass" onClick={e=>e.stopPropagation()}>
            <h4 style={{fontFamily:'Playfair Display', marginBottom: '1em'}}>Add Money In</h4>
            <form className="dxbt-moneyin-form" onSubmit={handleAdd}>
              <input
                type="text"
                placeholder="Source (e.g., Card, Gift, Salary)"
                value={source}
                onChange={e => setSource(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Amount (INR)"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
              />
              <select
                value={certainty}
                onChange={e => setCertainty(e.target.value)}
                required
                style={{marginBottom:'1em', padding:'0.7em', borderRadius:'13px', border:'1.5px solid #EFE8D2', fontFamily:'Lato'}}
              >
                <option value="Present">Present</option>
                <option value="Not Present But Certain">Not Present But Certain</option>
                <option value="Not Present And Not Certain">Not Present And Not Certain</option>
                <option value="Unsure">Unsure</option>
              </select>
              {error && <div className="dxbt-form-error" style={{marginBottom: '0.7em'}}>{error}</div>}
              <button type="submit" className="dxbt-add-btn luxury-pill">Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
