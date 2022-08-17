import React, { useEffect } from 'react';
import { getBlockByNumber, getTransactionByHash } from './api/etherscan';
import { Block } from './components/Block/Block';
import { BlockList } from './components/BlockList/BlockList';

function App() {
  useEffect(() => {
    const getBlock = async () => {
      const res = await getBlockByNumber('2165403');
      console.log('res: ', res);
      console.log('res: ', res.data.result.blockNumber);
    };

    const getTransaction = async () => {
      const res = await getTransactionByHash('0xfdsafasf');
    };

    getTransaction();
    getBlock();
  }, []);

  return (
    <div className="App">
      <BlockList
        blocks={[
          { blockNumber: '1', timeStamp: '3' },
          { blockNumber: '1', timeStamp: '3' },
          { blockNumber: '1', timeStamp: '3' },
          { blockNumber: '1', timeStamp: '3' },
          { blockNumber: '1', timeStamp: '3' },
          { blockNumber: '1', timeStamp: '3' },
          { blockNumber: '1', timeStamp: '3' },
          { blockNumber: '1', timeStamp: '3' },
          { blockNumber: '1', timeStamp: '3' },
          { blockNumber: '1', timeStamp: '3' },
          { blockNumber: '1', timeStamp: '3' },
        ]}
      />
    </div>
  );
}

export default App;
