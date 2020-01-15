import React from 'react';
import "./Profile.css"

const UserForm = () => {

    // const [name, setName] = useState(firstName);
    
    // Change username, password
    // Add/change description


    return (
      <form>
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" required />
          <label>Last Name</label>
          <input type="text" name="lastName" required />
        </div>
        <div>
            <label>User Name</label>
            <input type="text" name="userName" required></input>
        </div>
        <div>
          <label>Email Address</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password1"/>
        </div>
        <div>
          <label>Re-enter Password</label>
          <input type="password" name="password2"/>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    )
  }
export default UserForm