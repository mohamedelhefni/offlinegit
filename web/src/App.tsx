import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import ReposList from './components/ReposList'
import { VscGithubAction } from "react-icons/vsc"

function App() {

  return (
    <div className="App">
      <h1 className='text-3xl md:text-6xl my-5 text-center mx-auto font-bold flex items-center justify-center gap-2 '>
        <span>Offline Git</span>
        <VscGithubAction />
      </h1>
      <div className="flex flex-col gap-4 container mx-auto px-2 md:px-0">
        <div className="flex items-center justify-center">
          <SearchBar />
        </div>

        <ReposList />

      </div>
    </div>
  )
}

export default App
