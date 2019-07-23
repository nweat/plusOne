import React from 'react'
import NavBar from './NavBar'
import Calendar from "./components/Calendar";
import './App.css'

class App extends React.Component {
  render() {
    return (
    <div>
      <NavBar/>
      <main>
       <Calendar />
     </main>
    </div>
      )
  }
}

export default App
