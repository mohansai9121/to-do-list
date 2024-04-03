import { Button, ButtonToolbar } from 'rsuite';
import './App.css';
import { useEffect, useState } from 'react';
import './todopic.jpg'

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [todoslist, setTodosList] = useState([])
  const [isComplete, setIscomplete] = useState(false)
  const submitHandler = (e)=>{
    e.preventDefault()
    let todoItem={
      newtitle:title,
      newdescription:description
    }
    let newlist = [...todoslist]
    newlist.push(todoItem)
    setTodosList(newlist)
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
        {todoslist.map((activity, index)=>{
          return(
            <h4>{activity.newtitle}and {index}</h4>
          )
        })}
      </div>
    </div>
  );
}

export default App;
