import { Button, ButtonToolbar } from 'rsuite';
import './App.css';
import { useEffect, useState } from 'react';
import './todopic.jpg'
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [todoslist, setTodosList] = useState([])
  const [isComplete, setIscomplete] = useState(false)
  let completed = []
  const submitHandler = (e)=>{
    e.preventDefault()
    let todoItem={
      newtitle:title,
      newdescription:description
    }
    let newlist = [...todoslist]
    newlist.push(todoItem)
    localStorage.setItem("allTodos",JSON.stringify(newlist))
    let todos = JSON.parse(localStorage.getItem("allTodos"))
    if(todos){
      setTodosList(todos)
    }
    setTitle('')
    setDescription('')
  }
  const completedHandler=(idx)=>{
    completed.push(todoslist[idx])
    todoslist.splice(idx,1)
  }
  const deleteHandler1=(idx)=>{
    completed.splice(idx,1)
  }
  const deleteHandler = (idx)=>{
    todoslist.splice(idx,1)
  }
  useEffect(()=>{
    console.log(todoslist)

  }, [todoslist])
  return (
    <div className="App">
      <h2 style={{color:'blue'}}>To do List</h2>
      <img src='todopic.jpg' alt='to list pic' title='Todo List' width='200px' height='250px'/>
      <div className='todoinput'>
        <form>
          <label><b>Title:</b></label>{' '}
          <input type='text' value={title} placeholder='Title for the thing to do...' onChange={(e)=>setTitle(e.target.value)}/><br/><br/>
          <label><b>Description:</b></label>{' '}
          <input type='textarea' value={description} placeholder='Description for the title...' onChange={e=>setDescription(e.target.value)} /><br/><br/>
          <Button appearance='ghost' color='green' onClick={submitHandler}>Add</Button>
        </form>
      </div>
      <ButtonToolbar>
        <Button appearance='primary' style={{margin:'20px'}} color='blue' className={`${isComplete===false && 'button'}`} onClick={()=>setIscomplete(false)}>Tasks</Button>
        <Button appearance='ghost' style={{margin:'20px'}} color='green'className={`${isComplete===true && 'button'}`} onClick={()=>setIscomplete(true)}>Completed</Button>
      </ButtonToolbar><hr></hr>
      <div>
        {isComplete===false && todoslist.map((activity, index)=>{
          return(
            <div className='todos' key={index}>
              <h3>{activity.newtitle}</h3>
              <p>{activity.newdescription}</p>
              <Button endIcon={<TiTick/>} className='completedButton' onClick={completedHandler}>Completed</Button>
              <Button startIcon={<MdDelete/>} className='deleteButton' onClick={deleteHandler}>delete</Button>
            </div>
          )
        })}
        {isComplete===true && completed.map((activity, index)=>{
          return(
            <div className='todos' key={index}>
              <h3>{activity.newtitle}</h3>
              <p>{activity.newdescription}</p>
              <Button startIcon={<MdDelete/>} className='deleteButton' onClick={deleteHandler1}>delete</Button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
