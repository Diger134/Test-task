import React from 'react';

export default function MatrixField({matrix, paintingActive}) {
    const matrixRow = matrix.map((row, rowId) => {
                                    const matrixCell = row.map((cell, cellId) =>
                                                            <div className = {checkPaint(matrix, row, rowId, cell, cellId, paintingActive )} key = { cellId }> 
                                                                {cell}
                                                            </div>) 
                                    return <div className = "matrix-field_row" key = {rowId}> { matrixCell } </div>})
    return (
        <div className = "matrix-field" > { matrixRow } </div>
    )
}

function checkPaint(matrix, row, rowId, cell, cellId, paintingActive ) {
    let count = 0;
    const cellOneForward = row[cellId + 1];
    const cellTwoForward = row[cellId + 2];
    const cellOneBack = row[cellId - 1];
    const cellTwoBack = row[cellId - 2];
    const cellOneUp = matrix[rowId - 1] !== undefined && matrix[rowId - 1][cellId];
    const cellTwoUp = matrix[rowId - 2] !== undefined && matrix[rowId - 2][cellId];
    const cellOneDown = matrix[rowId + 1] !== undefined && matrix[rowId + 1][cellId];
    const cellTwoDown = matrix[rowId + 2] !== undefined && matrix[rowId + 2][cellId];
    const cellOneForwardOneUp = matrix[rowId - 1] !== undefined && matrix[rowId - 1][cellId + 1];
    const cellOneBackOneDown = matrix[rowId + 1] !== undefined && matrix[rowId + 1][cellId - 1];
    const cellOneForwardOneDown = matrix[rowId + 1] !== undefined && matrix[rowId + 1][cellId + 1];
    const cellOneBackOneUp = matrix[rowId - 1] !== undefined && matrix[rowId - 1][cellId - 1];
    if (cellOneBack === '1') {
        count++;
    }
    if (cellOneForward === '1') {
        count++;
    }
    if (cellOneDown === '1') {
        count++;
    }
    if (cellOneUp === '1') {
        count++;
    }
    if (cell === '1' && count >= 2 && paintingActive  ) {
        return "matrix-field_block__marked";
    } else  if (cell === '1' && 
                count >= 1 && 
                paintingActive && 
                ((cellOneBack === '1' && cellTwoBack === '1' ) || 
                 (cellOneForward === '1' && cellTwoForward === '1' ) || 
                 (cellOneUp === '1' && cellTwoUp === '1') || 
                 (cellOneDown === '1' &&  cellTwoDown === '1') || 
                 (cellOneForward === '1' && cellOneForwardOneUp === '1' ) ||
                 (cellOneDown === '1' && cellOneBackOneDown === '1' ) ||
                 (cellOneDown === '1' && cellOneForwardOneDown === '1') ||
                 (cellOneUp === '1' && cellOneBackOneUp === '1') ||
                 (cellOneBack === '1' && cellOneBackOneUp === '1') ||
                 (cellOneUp === '1' && cellOneForwardOneUp === '1') ||
                 (cellOneBack === '1' && cellOneBackOneDown === '1') ||
                 (cellOneForward === '1' && cellOneForwardOneDown === '1' ))) {
        return "matrix-field_block__marked";
    } else {
        return "matrix-field_block"
    }
}
