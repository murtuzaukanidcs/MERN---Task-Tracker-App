import React from 'react'

const EditableRows = (props) => {
    return (
        <tr>
            <td></td>
            <td><input type="text" onChange={props.changeHandleEdit} className="form-control" value={props.editTask.title} name="title" id="title" placeholder='Enter title of task' /></td>
            <td>
                <textarea onChange={props.changeHandleEdit} className="form-control" value={props.editTask.desc} name="desc" id="desc" placeholder='Enter description of task'>
                </textarea>
            </td>
            <td>
                <button onClick={props.editTaskClick} className='btn btn-success'> SAVE </button>
                &nbsp;&nbsp;
                <button onClick={props.cacelButtonClick} className='btn btn-danger'> CANCEL </button>
            </td>
        </tr>
    )
}

export default EditableRows
