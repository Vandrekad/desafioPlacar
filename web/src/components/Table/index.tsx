import { table } from 'console';
import React, { useState, useEffect } from 'react';

import './styles.css';

interface TableProps {
    games: Array<number>
}

const Table: React.FC<TableProps> = ({ games }) => {
    const [scores, setScores] = useState([{
        score: 0,
        pMax: 0,
        pMin: 0,
        rMax: 0,
        rMin: 0
    }]);

    function newListScores() {
        let newList = [{
            score: 0,
            pMax: 0,
            pMin: 0,
            rMax: 0,
            rMin: 0
        }];
        var i = 0;
        let pMax = 0;
        let pMin = 0;
        let rMax = 0;
        let rMin = 0;
        for (i; i < games.length; i++) {
            if (i === 0) {
                const item = [{
                    score: games[i],
                    pMin: games[i],
                    pMax: games[i],
                    rMin: 0,
                    rMax: 0
                }];
                pMax = games[i];
                pMin = games[i];
                newList = item;
            } else {
                if (games[i] > pMax) {
                    pMax = games[i];
                    rMax++;
                }
                if (games[i] < pMin) {
                    pMin = games[i];
                    rMin++;
                }
                newList.push({
                    score: games[i],
                    pMin: pMin,
                    pMax: pMax,
                    rMin: rMin,
                    rMax: rMax
                })
            }
        }
        return setScores(newList);
    }

    useEffect(() => { newListScores() }, [games]);

    return (
        <div className="table">
            <table>
                <thead>

                    <tr>
                        <th>Jogo</th>
                        <th>Pontos</th>
                        <th>Min. Pontos</th>
                        <th>Max. Pontos</th>
                        <th>Recorde Min.</th>
                        <th>Recorde Max</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td> {index} </td>
                            <td> {score.score} </td>
                            <td> {score.pMin} </td>
                            <td> {score.pMax} </td>
                            <td> {score.rMin} </td>
                            <td> {score.rMax} </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>

                </tfoot>

            </table>
        </div>
    );
}

export default Table;