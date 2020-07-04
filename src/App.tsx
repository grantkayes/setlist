import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import './App.scss'

type Inputs = {
  username: string,
  passwordRequired: string,
};

interface UserUI {
  id: string;
  username: string;
  name: string;
  email: string;
}

const App = () => {

  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  const onSubmit = (data: any) => console.log(data);
  const [welcomeMessage, setWelcomeMessage] = useState('')

  // Prepare state hook for users list
  // Note: <UserUI[]> is for TypeScript
  // It specifies the shape of usersList state
  const [usersList, setUsersList] = useState<UserUI[]>([])

  // Create async function for fetching welcome message
  const fetchMessage = async () => {
    // Use Fetch API to fetch '/api' endpoint
    const message = await fetch('/api')
      .then(res => res.text()) // process incoming data
    // Update welcomeMessage state
    setWelcomeMessage(message)
  }

  // Use useEffect to call fetchMessage() on initial render
  useEffect(() => {
    fetchMessage()
  }, [])

  // Create async function for fetching users list
  const fetchUsers = async () => {
    const users = await fetch('/users/all')
      .then(res => res.json()) // Process the incoming data
    // Update usersList state
    setUsersList(users)
  }

  return (
    <div className="app">
      <header className="app-header">
        <p>{welcomeMessage}</p>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
          <input name="username" defaultValue="test" ref={register} />
          
          {/* include validation with required or other standard HTML validation rules */}
          <input name="passwordRequired" ref={register({ required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.passwordRequired && <span>This field is required</span>}
          
          <input type="submit" />
        </form>
        
        <button onClick={fetchUsers}>Fetch users</button>
        {usersList.length > 0 && <table>
          <thead>
            <tr>
              <th>ID</th>
             <th>Username</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user: UserUI) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>}
      </header>
    </div>
  )
}
export default App