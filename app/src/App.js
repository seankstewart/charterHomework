import logo from './logo.svg';
import './App.css';
import React from 'react';


const transactionModel = [
  {
    "transaction_id":"",
    "amount": null
  },
  {
    "transaction_id":"12345",
    "amount": 52.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"2022-01-01T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  },
  {
    "transaction_id":"345",
    "amount": 100.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"2022-02-10T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  },
  {
    "transaction_id":"45",
    "amount": 105.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"2022-02-12T01:01:01Z",
    "client_ref_id":314,
    "state":1
  },
  {
    "transaction_id":"123",
    "amount": 200.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"2022-01-30T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  },
  {
    "transaction_id":"456",
    "amount": 120.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"2022-03-16T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  },
  {
    "transaction_id":"123456",
    "amount": 5000.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"2022-03-01T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  },
  {
    "transaction_id":"5678",
    "amount": 145.45,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"2022-03-01T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  }
]



const TransactionDataList = (props) => {
  return (
    <section className="rewards-info">
      <div>
        <ul>
          <li>TransactionID: {transactionModel[props.transSelect.current.selectedIndex].transaction_id}</li>
          <li>Amount: <b>${transactionModel[props.transSelect.current.selectedIndex].amount.toFixed(2)}</b></li>
          <li>Timestamp: {transactionModel[props.transSelect.current.selectedIndex].timestamp}</li>
          <li>ClientRef: {transactionModel[props.transSelect.current.selectedIndex].client_ref_id}</li>
        </ul>
      </div>
      <div>
        Rewards Earned:<br />
        <span className="rewards-amount">{props.pointsTotal}</span>
      </div>
    </section>
  )
} 


function App() {

  let [pointsTotal, setPointsTotal] = React.useState(0);

  React.useEffect(() => {
    const getTransactions = async () => {
      await fetch(
        './api/transactions?months=3'
        ,
        {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
      ).then((response) => {
        try {
          return response.json();
        } catch(err) {
          console.log(err.message);
        }
      }).then(
        (data) => data = transactionModel
      );    
    }

    getTransactions();

  }, [])



  const transSelect = React.useRef(null);
  const [transactionValue, setTransactionValue] = React.useState("0")

  const showInfo = () => {
    if (transSelect.current === null) {
      return null
    } else {
      return <TransactionDataList transSelect={transSelect} pointsTotal={pointsTotal} />
    }
  }

  const calculatePoints = React.useCallback((purchaseTotal) => {

    if (purchaseTotal > 100) {
      setPointsTotal(parseInt(((purchaseTotal - 100) * 2) + 50))
    } else if (purchaseTotal > 50) {
      setPointsTotal(parseInt(((purchaseTotal - 50) * 1)))
    }
    return pointsTotal;
  }, [pointsTotal])

  const handleChange = React.useCallback((e) => {
    // setTransactionValue(e.target.value);
    e.preventDefault();
    calculatePoints(e.target.value);
    setTransactionValue(e.target.value);
  }, [calculatePoints, setTransactionValue]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <section className="reward-points">
        <h1>Reward Points</h1>
        <p style={{marginTop:0}}>Choose a Transaction ID below to view transaction information and reward points</p>
        <form className="reward-form">
          
          <div class="select-wrap">
          {(pointsTotal === 0) ? <label>Transaction ID</label> : null}
            <select name="transactionID" value={(transSelect.current === null) ? transactionValue : parseFloat(transSelect.current.value)} ref={transSelect} onChange={handleChange} onClick={() => setPointsTotal(0)} className="reward-select">
              {transactionModel.map((transactionObject) => (<option key={transactionObject.transaction_id} value={transactionObject.amount}>{transactionObject.transaction_id}</option>))}
            </select>
          </div>
          
        </form>
        {
          (pointsTotal === 0) ? 
            null 
          :
          
            <>
              {showInfo()}
            </>
          
        }
      </section>
    </div>
  );
}

export default App;
