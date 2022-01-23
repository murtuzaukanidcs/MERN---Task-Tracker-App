import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import ReadOnlyRows from './readOnlyRows'
import EditableRows from './editableRows'

const Home = (props) => {

    const history = useHistory();

    /** Fetch data */
    const [taskDetails, setTaskDetails] = useState([])

    /** Edit data */
    const [editTaskId, setEditTaskId] = useState(null)

    const getTask = () => {
        axios.get("http://localhost:5000/task").then(res => {
            setTaskDetails(res.data.task)
        });
    }
    useEffect(() => getTask(), [])

    const [task, setTask] = useState({
        title: "",
        desc: ""
    })


    /** Handle Change Event */
    const changeHandle = (e) => {
        const { name, value } = e.target
        setTask({
            ...task,
            [name]: value
        })
    }

    /********************* EDIT *************************/
    /** Use Satet to store value */
    const [editTask, setEditTask] = useState({
        title: "",
        desc: ""
    })

    /** Click event on update button */
    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditTaskId(item._id)

        const formValues = {
            title: item.title,
            desc: item.desc
        }
        setEditTask(formValues)
    }
    /** Handle input filed change event */
    const changeHandleEdit = (e) => {
        const { name, value } = e.target
        setEditTask({
            ...editTask,
            [name]: value
        })
    }

    /** Edit task */
    const editTaskClick = (event) => {
        event.preventDefault();
        const { title, desc } = editTask

        if (title && desc) {
            axios.put("http://localhost:5000/task/" + editTaskId, editTask)
                .then(res => {
                    alert(res.data.message);
                    cacelButtonClick();
                })
        } else {
            alert("All fields are mandatory! Please fill all input.")
        }
    }

    /** Add task */
    const addTask = (e) => {
        const { title, desc } = task
        if (title && desc) {
            axios.post("http://localhost:5000/task", task)
                .then(res => {
                    alert(res.data.message);
                    setTask({
                        title: "",
                        desc: ""
                    })
                    getTask()
                    history.push("/");
                })
        } else {
            alert("All fields are mandatory! Please fill all input.")
        }
    }

    const logout = (e) => {
        props.setUser({})
    }

    /********************************* DELETE DATA ********************************/

    const [deleteDataID, setDeleteDataID] = useState(null)

    const deleteData = (event, item) => {
        // event.preventDefault();
        if (item._id) {
            axios.delete("http://localhost:5000/task/" + item._id)
            .then((res) => {
                alert(res.data.message);
                cacelButtonClick();
            })
        } else {
            alert("Sorry! There is problem on delete.")
        }
    }

    /** Cancel button click */
    const cacelButtonClick = () => {
        setEditTaskId(null)
        getTask()
        history.push("/");
    }

    return (
        <div className='container'>
            {/* {console.log(taskDetails)} */}
            <h1 className="display-3 text-center mt-5">Task Tracker App</h1>
            <hr />
            <button className='btn btn-block btn-warning' onClick={logout}>Logout</button>
            <hr />
            <div className="row">
                <div className="col-md-5 col-sm-12">
                    <div className="row">
                        <div className="col-12">

                            <div className="form-group">
                                <label htmlFor="">Title of task :</label>
                                <input type="text" className="form-control" value={task.title} name="title" id="title" onChange={changeHandle} placeholder='Enter title of task' aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">E.g.: Go to GYM</small>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="">Description of task :</label>
                                <textarea className="form-control" value={task.desc} name="desc" id="desc" onChange={changeHandle} placeholder='Enter description of task' aria-describedby="helpId">
                                </textarea>
                            </div>
                        </div>
                    </div>

                    <div className="row text-center">
                        <div className="col-12">
                            <button className='btn btn-success' onClick={addTask}>+ Add Task</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-sm-12 text-center">
                    <h1 className='text-center'>Task details</h1>
                    {/* <form> */}
                        <table className="table table-striped table-inverse table-bordered" >
                            <thead className="thead-inverse">
                                <tr>
                                    <th>#</th>
                                    <th>Task</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tfoot className="thead-inverse">
                                <tr>
                                    <th>#</th>
                                    <th>Task</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                            <tbody>

                                {
                                    taskDetails.map(item => (
                                        <Fragment>
                                            {editTaskId === item._id ? <EditableRows cacelButtonClick={cacelButtonClick} editTask={editTask} changeHandleEdit={changeHandleEdit} editTaskClick={editTaskClick} /> : <ReadOnlyRows handleEditClick={handleEditClick} deleteData={deleteData} item={item} />}
                                        </Fragment>
                                    ))
                                }

                            </tbody>
                        </table>
                    {/* </form>c */}
                </div>
            </div>
        </div>

    )
}

export default Home