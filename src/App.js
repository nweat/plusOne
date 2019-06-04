import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import './App.css'

class App extends React.Component {
  render() {
    return (
    <div>
      <NavBar/>
      <SideBar/>
    </div>
      )
  }
}

export default App
