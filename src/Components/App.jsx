import React from 'react';
import MatrixField from './MatrixField.jsx';

import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class App extends React.Component {
    state = {
        inputValue: 0,
        matrix: [],
        paintingActive: false

    }

    componentDidMount = () => {
        if (JSON.parse(localStorage.getItem('matrix')) !== null) {
            this.setState({
                matrix: JSON.parse(localStorage.getItem('matrix')),
                paintingActive: JSON.parse(localStorage.getItem('paintingActive'))
            })

        }
    }

    getValue = (event) => {
        this.setState ({
            inputValue: event.target.value
        });
    }

    createMatrix = () => {
        const newMatrix = []
        for (let index = 0; index < this.state.inputValue; index++) {
            const matrixRow = []
            for (let index = 0; index < this.state.inputValue; index++) {
                matrixRow.push(Math.floor(Math.random() * 2).toString())
            }
            newMatrix.push(matrixRow)
        }
        this.setState ({
            matrix: newMatrix,
            paintingActive: false
        })
        localStorage.setItem('matrix', JSON.stringify(newMatrix));
        localStorage.setItem('paintingActive', JSON.stringify(false));
    }

    paintOver = () => {

        this.setState ({
            paintingActive: true
        })
        localStorage.setItem('paintingActive', JSON.stringify(true));
    }

    render() {
        return (
             <div className="container">
                <div className="settings-field">
                    <p className="settings-field_text">Размерность матрицы</p>
                    <Input onChange = { this.getValue } classes={{ input: 'settings-field_input' }} type="number" />
                    <Button onClick = { this.createMatrix } className="settings-field_btn" variant="contained" >
                        Создать
                    </Button>
                    <Button onClick = { this.paintOver } className="settings-field_btn" variant="contained" >
                        Закрасить
                    </Button>
                </div>  
                <MatrixField paintingActive = { this.state.paintingActive } matrix = {this.state.matrix}/>
             </div>
        );
    }
}

export default App;
