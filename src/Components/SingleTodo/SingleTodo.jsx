import React, { useState } from 'react'
import style from './SingleTodo.module.css';
import {FiEdit} from 'react-icons/fi';
import {AiFillDelete} from 'react-icons/ai';
import { db } from '../../utilies/firebase';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// random number
function rand() {
    return Math.round(Math.random() * 20) - 10;
}
// modal style
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

// css for modal
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));



const SingleTodo = ({todo}) => {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [input, setInput] = useState('');

    // delete item from todo
    const deleteTodo = () => {
        db.collection('todos').doc(todo.id).delete()
        console.log('delete');
    }


    // state for modal
    const [open, setOpen] = useState(false);


    // update todo
    const updateTodo = () => {
        db.collection('todos').doc(todo.id).set({
            todo:input
        }, {merge:true});

        setOpen(false);
    }



    return (
        <>

        <Modal 
            open={open}
            onClose = {e => setOpen(false)}
        > 
            <form onSubmit={updateTodo} style={modalStyle}  className={`${classes.paper}  ${style.modal_form}`}>
                <h5>Update Your Todo</h5>
                <input placeholder={todo.todo} type="text"  value={input} onChange={e => setInput(e.target.value)}/>
                <button type='submit'>Update</button>
            </form>
        </Modal>
            <div className={style.single__todo__flex}>
                <h4>{todo.todo}</h4>

                <div className={style.todo__action}>
                    <FiEdit onClick={e => setOpen(true)} title='EDIT' className={style.edit__icon}/>
                    <AiFillDelete onClick={deleteTodo} title='DELETE' className={style.delete__icon}/>
                </div>
            </div>
        </>
    )
}

export default SingleTodo
