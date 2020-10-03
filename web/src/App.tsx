import React, { useEffect, useState } from 'react';
import './assets/styles/global.css';
import Modal from './components/Modal';
import PageDefault from './components/PageDefault';
import Table from './components/Table';

function App() {
  const URL = 'http://localhost:3333'
  const [games, setGames] = useState([0]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    fetch(URL + '/scores', {
      method: 'GET',
      headers: {
        'id_user': '1',
      },
    }).then(async (serverAnswer) => {
      const answer = await serverAnswer.json();
      setGames([
        ...answer,
      ])
    }).catch((error) => {
      return console.log(error)
    });
  }, [])

  return (
    <PageDefault funcState={setModalIsVisible}>
      <Modal
        stateModal={modalIsVisible}
        funcState={setModalIsVisible}
        games={games}
        setGames={setGames}
      />
      <Table games={games} />
    </PageDefault>
  );
}

export default App;
