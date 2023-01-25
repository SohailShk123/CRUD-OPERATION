
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

const getLocalItems = () =>{
  let list = localStorage.getItem('List');
  console.log(list);
  if(list){
    return JSON.parse(localStorage.getItem('List'));
  }
  else{
    return [];
  }
}

function App() {

  const [name,setName] = useState('')
  const [middle, setMiddle] = useState('')
  const [last , setLast] = useState('')

  const [user, setUser] = useState(getLocalItems());


  const addUser = (e) =>{
    e.preventDefault();

    const info = {
      name,
      middle,
      last,
    }
    setUser([...user,info])
    setName('')
    setMiddle('')
    setLast('')
  }


  // delete function
  const onDeleteHandler=(id)=>{
   
    const deletedItems = user.filter((ele,index)=>{
      return id !== index
    })
    setUser(deletedItems)
  }

  // delete all

  const removeAll = () => {
    setUser([]);
  }

  // add data to local storage

  useEffect(()=>{
    localStorage.setItem('List', JSON.stringify(user))
  },[user])

  return (
    <div className="App">
      <h1>React Crud Operations</h1>
      <div className='container'>
      <div className='upper'>

      {/* upper inputs */}
      <form  onSubmit={addUser}>

        <div className='inputs'>
          <label htmlFor="name">Name</label><br />
          <input type="text" id='name' value={name} onChange={(e)=>{setName(e.target.value)}} required />
        </div>
        <div className='inputs'>
          <label htmlFor="middle">Middle</label><br />
          <input type="text" id='middle' value={middle} onChange={(e)=>{
          setMiddle(e.target.value)}} required />
        </div>
        <div className='inputs'>
          <label htmlFor="last">Last</label><br />
          <input type="text" id='last' value={last} onChange={(e)=>{setLast(e.target.value)}} required />
        </div>
        <button className='upperbtn' >Add</button>
        <button className='upperbtn' onClick={removeAll}>Remove all</button>

      </form>
      </div>
      <div>
        {/* lower details */}

        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Middle</th>
              <th>Last</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user,i) =>{
              return (
                <tr key={i}>
                  <td>{user.name}</td>  
                  <td>{user.middle}</td>  
                  <td>{user.last}</td>  
                  <td><button  >Edit</button></td>  
                  <td><button onClick={()=>{onDeleteHandler(i)}}>Delet</button></td>  
                </tr>
              )
            })}
                
          </tbody>
        </table>
      </div>

      </div>
    </div>
  );
}

export default App;
