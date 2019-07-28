import React from 'react'
import NavBar from './components/NavBar/NavBar'
import Calendar from "./components/Calendar/Calendar";
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
