import React from 'react'

const ReadOnlyRows = ({ item, handleEditClick, deleteData }) => {
    var i = 1;
    return (
        <tr>
            <td>{i++}</td>
            <td>{item.title}</td>
            <td>{item.desc}</td>
            <td>
                <button onClick={(event) => handleEditClick(event,item)} className='btn btn-info'>UPDATE</button>
                &nbsp;
                &nbsp;
                <button onClick={(event) => deleteData(event,item)} className='btn btn-danger'>DELETE</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRows
