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
    "timestamp":"1990-01-01T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  },
  {
    "transaction_id":"345",
    "amount": 100.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"1990-01-01T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  },
  {
    "transaction_id":"45",
    "amount": 105.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"1990-01-01T01:01:01Z",
    "client_ref_id":314,
    "state":1
  },
  {
    "transaction_id":"123",
    "amount": 200.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"1990-01-01T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  },
  {
    "transaction_id":"456",
    "amount": 120.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"1990-01-01T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  },
  {
    "transaction_id":"123456",
    "amount": 5000.00,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"1990-01-01T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  }
]



const RewardsButton = ({amount, pointsTotal, setPointsTotal}) => {

  // let [pointsTotal, setPointsTotal] = React.useState(0);

  // React.useEffect(() => {
  //   if (pointsTotal !== 0 && amount !== 0) {
  //     setPointsTotal(0);
  //   }
  // })

  const calculatePoints = (purchaseTotal) => {

    // let pointsTotal = 0;
    if (purchaseTotal > 100) {
      setPointsTotal(((purchaseTotal - 100) * 2) + 50)
      // pointsTotal = ((purchaseTotal - 100) * 2) + 50;
    } else if (purchaseTotal > 50) {
      setPointsTotal(((purchaseTotal - 50) * 1))
      // pointsTotal = (pointsTotal = ((purchaseTotal - 50) * 1)
    }
    return pointsTotal;
  }
  
  return (
    <>
      <button  style={{flex:'1 0 30%'}} onClick={() => calculatePoints(amount)}>Calculate Rewards</button>
      <p style={{flex:'1 0 100%',textAlign:'center'}}>Thank you for your purchase.<br />You have <span className="rewards-amount">{pointsTotal}</span> reward points.</p>
    </>
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

  const handleChange = React.useCallback((e) => {
    // setTransactionValue(e.target.value);
    e.preventDefault();
    setTransactionValue(e.target.value);
  }, [setTransactionValue]);

  const showInfo = () => {
    if (transSelect.current === null) {
      return 'Information'
    } else {
      // console.log(transSelect.current);
      // debugger;
      return `$${transactionModel[transSelect.current.selectedIndex].amount}`
    }
  }

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
        
        <div className="reward-form">
          <form style={{flex:'1 0 30%'}}>
            <p>
              Pick a Transaction ID
              <select value={(transSelect.current === null) ? transactionValue : parseInt(transSelect.current.value)} ref={transSelect} onChange={handleChange} onClick={() => setPointsTotal(0)}>
                {transactionModel.map((transactionObject) => (<option key={transactionObject.transaction_id} value={transactionObject.amount}>{transactionObject.transaction_id}</option>))}
              </select>
            </p>
            
          </form>

          <div style={{alignSelf:'center',flex:'1 0 40%'}}>
            {showInfo()}
          </div>

          <RewardsButton amount={transactionValue} pointsTotal={pointsTotal} setPointsTotal={setPointsTotal} />
          
        </div>
      </section>
    </div>
  );
}

export default App;
