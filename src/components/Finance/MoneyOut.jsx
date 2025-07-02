import React, { useState } from 'react';

const CATEGORY_LIST = [
  'Experiences',
  'Shopping',
  'Transport',
  'Food',
  'Utilities',
  'Miscellaneous',
];
const COST_TYPE_LIST = ['Fixed', 'Variable'];
const PURPOSE_LIST = ['Leisure', 'Transport', 'Logistics', 'Emergencies', 'Other'];
const PAYMENT_METHOD_LIST = ['Cash', 'Card', 'App', 'Digital Wallet'];

import MoneyOutPieChart from './MoneyOutPieChart';
import './MoneyOut.css';
import dxbtLogo from '../../assets/logo.png';

export default function MoneyOut({ moneyOutList, setMoneyOutList, conversionRate }) {
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState(CATEGORY_LIST[0]);
  const [currency, setCurrency] = useState('AED');
  const [amount, setAmount] = useState('');
  const [costType, setCostType] = useState('Variable');
  const [purpose, setPurpose] = useState('Leisure');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [error, setError] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!desc.trim() || !amount || isNaN(Number(amount))) {
      setError('Enter a valid description and amount');
      return;
    }
    setMoneyOutList([
      ...moneyOutList,
      {
        desc: desc.trim(),
        category,
        currency,
        amount: Number(amount),
        costType,
        purpose,
        paymentMethod,
      },
    ]);
    setDesc('');
    setAmount('');
    setCostType('Variable');
    setPurpose('Leisure');
    setPaymentMethod('Cash');
    setError('');
  };

  const handleRemove = (idx) => {
    setMoneyOutList(moneyOutList.filter((_, i) => i !== idx));
  };

  return (
    <div className="dxbt-moneyout-section luxury-bg">
      <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'0.7em'}}>
        <img src={dxbtLogo} alt="DXBT Logo" style={{maxWidth:'350px', marginBottom:'0.6em', display:'block'}} />
      </div>
      <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'1.5em'}}>
        <h3 style={{fontFamily:'Playfair Display', fontWeight:700, fontSize:'2rem', letterSpacing:'1px', textAlign:'center'}}>Money Out</h3>
      </div>
      <form className="dxbt-moneyout-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Description (e.g., Deep diving, Shopping)"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORY_LIST.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={costType} onChange={e => setCostType(e.target.value)}>
          {COST_TYPE_LIST.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select value={purpose} onChange={e => setPurpose(e.target.value)}>
          {PURPOSE_LIST.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          {PAYMENT_METHOD_LIST.map(pm => (
            <option key={pm} value={pm}>{pm}</option>
          ))}
        </select>
        <div className="dxbt-currency-row">
          <select value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="AED">AED</option>
            <option value="INR">INR</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="dxbt-add-btn">Add</button>
      </form>
      {error && <div className="dxbt-form-error">{error}</div>}
      <div className="dxbt-moneyout-table-wrapper">
        <table className="dxbt-moneyout-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Cost Type</th>
              <th>Purpose</th>
              <th>Payment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {moneyOutList.map((txn, idx) => (
              <tr key={idx}>
                <td>{txn.desc}</td>
                <td>{txn.category}</td>
                <td>{txn.amount}</td>
                <td>{txn.currency}</td>

                <td>{txn.costType}</td>
                <td>{txn.purpose}</td>
                <td>{txn.paymentMethod}</td>
                <td>
                  <button type="button" className="dxbt-remove-btn" onClick={() => handleRemove(idx)}>&times;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 style={{marginTop:'2em', marginBottom:'0.5em', fontFamily:'Playfair Display', color:'#A68E45'}}>Spending by Category</h4>
      <MoneyOutPieChart moneyOutList={moneyOutList} />
      <div className="dxbt-moneyout-total">
        <strong>Total Out: </strong>
        ₹ {moneyOutList.reduce((sum, item) => sum + (item.currency === 'AED' ? item.amount * conversionRate : item.amount), 0).toLocaleString()}
      </div>
    </div>
  );
}
