import React, { useEffect, useState } from 'react';

import ExitIcon from '../../assets/logout.svg'

import './style.css';

interface ModalProps {
    stateModal: Boolean;
    funcState: Function;
    games: Array<number>;
    setGames: Function;
}

const Modal: React.FC<ModalProps> = ({ stateModal, funcState, games, setGames }) => {
    const URL = 'http://localhost:3333'
    const [scoreValue, setScoreValue] = useState('');
    const [bestScore, setBestScore] = useState(0);
    const [lessScore, setLessScore] = useState(0);

    function bestLess(games: Array<number>, bestScore: Number, lessScore: Number) {
        let Less = 0;
        let Best = 0;
        for (var i = 0; i < games.length; i++) {
            if (i === 0) {
                Less = games[i];
                Best = games[i];
            } else if (games[i] > Best) {
                Best = games[i];
            } else if (games[i] < Less) {
                Less = games[i];
            }
        }
        setBestScore(Best);
        return setLessScore(Less);
    }

    useEffect(() => { bestLess(games, bestScore, lessScore) }, [stateModal]);

    if (stateModal) {
        return (
            <div id="ModalView">
                <div className="modal">
                    <div className="button">
                        <button
                            onClick={function CloseModal() {
                                funcState(false);
                            }}
                        >
                            <img src={ExitIcon} alt="exit" />
                        </button>
                    </div>
                    <div className="score">
                        <div className="Title">
                            <h1>NOVO JOGO</h1>
                        </div>
                        <div className="scoreInput">

                            <input
                                type="number"
                                value={scoreValue}
                                onChange={function handleChange(info) {
                                    setScoreValue(info.target.value)
                                }}
                            />
                            <button
                                onClick={function addValue() {
                                    fetch(URL + '/scores', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'id_user': '1',
                                        }, body: JSON.stringify({
                                            'score': scoreValue
                                        })
                                    }).then(async (serverAnswer) => {
                                        const answer = await serverAnswer.json();
                                        setGames([
                                            ...games,
                                            answer
                                        ])
                                        if (answer > bestScore) {
                                            console.log('Parabéns ultrapassou seu Recorde de Maior Pontuação!!!');
                                            console.log(bestScore);
                                            setBestScore(answer);
                                        } else if (answer < lessScore) {
                                            console.log('Que pena, bateu seu recorde de menor pontuação')
                                            console.log(lessScore);
                                            setLessScore(answer);
                                        }
                                    }).catch((error) => {
                                        return console.log(error)
                                    });
                                    setScoreValue('')
                                    funcState(false);
                                }}
                            >adicionar</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    } else {
        return null;
    }
}

export default Modal;