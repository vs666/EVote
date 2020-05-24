import React, { Component } from 'react';
import { PetitionList } from './DataSet'
class Table extends React.Component {


    render() {
        const calcSize = (num) => {
            return num.getSize();
        }
        return (
            <table>
                <thead>
                    <td>Petition Name</td>
                    <td>Petition Text</td>
                    <td>Petition Votes</td>
                </thead>
                <tbody>
                    {
                        PetitionList.map((numList, i) => (
                            <tr key={i}>
                                <td>{numList[0]}</td>
                                <td>{numList[1]}</td>
                                <td>{numList[2].getSize() - 1}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}

export default Table;