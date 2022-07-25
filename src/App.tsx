import React, { useEffect } from 'react';
import { getBlockByNumber, getTransactionByHash } from './api/etherscan';

function App() {
  useEffect(() => {
    const getBlock = async () => {
      const res = await getBlockByNumber('2165403');
      console.log('res: ', res);
      console.log('res: ', res.data.result.blockNumber);
    };

    getBlock();

    const getTransaction = async () => {
      const res = await getTransactionByHash('0xfdsafasf');
    };
    getTransaction();
  }, []);

  return <div className="App">test</div>;
}

export default App;
