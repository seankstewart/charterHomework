import logo from './logo.svg';
import './App.css';
import React from 'react';


const transactionModel = [
  {
    "transaction_id":"0123",
    "amount": null
  },
  {
    "transaction_id":"123",
    "amount": 200.00,
    "fee":66.25,
    "service_tax":8.25,
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
    "fee":66.25,
    "service_tax":8.25,
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
    "fee":66.25,
    "service_tax":8.25,
    "currency":"US",
    "sender_number":"72109xx741",
    "recipient_id":10002314,
    "timestamp":"1990-01-01T01:01:01Z",
    "client_ref_id":2314,
    "state":1
  }
]



const RewardsButton = (props) => {

  let [pointsTotal, setPointsTotal] = React.useState(0);

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
      <button onClick={() => calculatePoints(props.amount)}>Calculate Rewards</button>
      <p className="rewards-amount">{pointsTotal}</p>
    </>
  )
}

function App() {

  // React.useEffect(() => {
  //   console.log('App component loaded')
  //   console.log(transSelect.current.value);
  // },[])

  React.useEffect(() => {
    const getBooks = async () => {
      await fetch(
        'https://openlibrary.org/api/books?bibkeys=ISBN:0201558025,LCCN:93005405&format=json'
        // ,
        // {
        //   headers : { 
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        //    }
        // }
      ).then((response) => {
        try {
          // const json = JSON.parse(response);
          return response.json();
        } catch(err) {
          console.log(err.message);
        }
        
        // return response.text();
        // return JSON.parse(response);
        // return response.json();
      }).then(
        (data) => console.log(data)

      );    
    }

    getBooks();

  }, [])



  const transSelect = React.useRef(null);
  const [transactionValue, setTransactionValue] = React.useState("0")

  const handleChange = React.useCallback((e) => {
    // setTransactionValue(e.target.value);
    e.preventDefault();
    setTransactionValue(e.target.value);
  }, [setTransactionValue]);

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
          <form>
            <p>
              <select value={(transSelect.current === null) ? transactionValue : parseInt(transSelect.current.value)} ref={transSelect} onChange={handleChange}>
                {transactionModel.map((transactionObject) => (<option key={transactionObject.transaction_id} value={transactionObject.amount}>{transactionObject.amount}</option>))}
              </select>
            </p>
            
          </form>
          
          
          <RewardsButton amount={transactionValue} />
          <div>Info</div>

        </div>
      </section>
    </div>
  );
}

export default App;
