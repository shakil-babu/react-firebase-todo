import React, {useEffect, useState } from 'react'
import { db } from '../../utilies/firebase';
import SingleTodo from '../SingleTodo/SingleTodo';
import style from './Header.module.css';
import firebase from 'firebase';

const Header = () => {
    const [todos, setTodos] = useState([]); 
    const [input, setInput] = useState('');
    // get data from database(firestore)
    const getData = () => {
        db.collection("todos")
        .orderBy("timestamp", 'desc')
        .onSnapshot((snapshot) => {
            setTodos(snapshot.docs.map(doc => ({id:doc.id, todo:doc.data().todo, email:doc.data().email})));
        })
    };

    useEffect(() => {
        getData();
    },[])

    // submit handler
    const submitHandler = (event) => {
        event.preventDefault();

        // add data to database(firestore)
        db.collection("todos").add({
            todo:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
            
        })
        setInput("");

    }


    return (
        <>
            <section className={style.main__header__area}>
                <div className={style.todo__main__area}>

                    <h1>TODO - YOUR DAILY MISSION!</h1>


                    <form onSubmit={submitHandler} className={style.todo__form__area}>
                        <input value={input} onChange={(event) => setInput(event.target.value)} type="text" placeholder='TASK HERE'/>
                        <button className={input ? "btn-design" :"btn-disabled"} disabled={!input} type='submit'>ADD</button>
                    </form>


                </div>

                {/* ========= showcase area ========= */}
                <div className={style.todo__showcase__area}>
                     {
                         todos.map((todo, index) => <SingleTodo key={index+1} todo={todo}/>)
                     }
                </div>
            </section>
        </>
    )
}

export default Header
