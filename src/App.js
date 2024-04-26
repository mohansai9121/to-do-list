import { Button, ButtonToolbar } from 'rsuite';
import './App.css';
import todopic from './todopic.jpg';
import { useEffect, useState } from 'react';
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [todoslist, setTodosList] = useState([])
  const [isComplete, setIscomplete] = useState(false)
  const [completedList, setCompletedList] = useState([])
  const submitHandler = (e)=>{
    e.preventDefault()
    let todoItem={
      newtitle:title,
      newdescription:description
    }
    let newlist = [...todoslist]
    newlist.push(todoItem)
    localStorage.setItem("allTodos",JSON.stringify(newlist))
    setTodosList(newlist)
    alert(`${todoItem.newtitle} added succesfully to your To-Do-List`)
    setTitle('')
    setDescription('')
  }
  const completedHandler=(idx)=>{
    let now = new Date()
    let dd = now.getDate()
    let mm = now.getMonth()
    let yy = now.getFullYear()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()
    let completedAt = 'Completed at:'+h+'hours:'+m+"minutes:"+s+"secs, on"+dd+"-"+mm+"-"+yy
    let completed = {
      ...todoslist[idx],
      time:completedAt
    }
    alert(`${completed.newtitle} completed, check in completed list`)
    console.log(completed)
    let comList = [...completedList]
    comList.push(completed)
    setCompletedList(comList)
    localStorage.setItem("completedTodos",JSON.stringify(comList))
  }
  const deleteHandler1=(idx)=>{
    let delTodos = [...completedList]
    delTodos.splice(idx,1)
    setCompletedList(delTodos)
    localStorage.setItem("completedTodos",JSON.stringify(delTodos))
  }
  const deleteHandler = (idx)=>{
    let allTodos = [...todoslist]
    allTodos.splice(idx,1)
    setTodosList(allTodos)
    localStorage.setItem("allTodos", JSON.stringify(allTodos))
  }
  useEffect(()=>{
    let alltodos = JSON.parse(localStorage.getItem("allTodos"))
    if(alltodos){
      setTodosList(alltodos)
    }
    let completedOnes = JSON.parse(localStorage.getItem("completedTodos"))
    if(completedOnes){
      setCompletedList(completedOnes)
    }
  }, [])
  return (
    <div className="App">
      <h1 style={{color:'blue'}}>To do List</h1>
      <img src={todopic} alt='ToDoList' title='Todo List' width='200px' height='250px'/>
      <p>Get notified by your daily activities completed or not.</p>
      <p>You can add and also delete your activities...</p>
      <div className='todoinput'>
        <form>
          <label><b>Title:</b></label>{' '}
          <input type='text' value={title} placeholder='Title for the thing to do...' onChange={(e)=>setTitle(e.target.value)} required/><br/><br/>
          <label><b>Description:</b></label>{' '}
          <input type='textarea' value={description} placeholder='Description for the title...' onChange={e=>setDescription(e.target.value)} required/><br/><br/>
          <Button appearance='ghost' color='green' onClick={submitHandler} className='addButton'>Add</Button>
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
              <Button endIcon={<TiTick/>} className='completedButton' onClick={()=>completedHandler(index)}>Completed</Button>
              <Button startIcon={<MdDelete/>} className='deleteButton' onClick={()=>deleteHandler(index)}>delete</Button>
            </div>
          )
        })}
        {isComplete===true && completedList.map((activity, index)=>{
          return(
            <div className='todos' key={index}>
              <h3>{activity.newtitle}</h3>
              <p>{activity.newdescription}</p>
              <p>{activity.time}</p>
              <Button startIcon={<MdDelete/>} className='deleteButton' onClick={()=>deleteHandler1(index)}>delete</Button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
