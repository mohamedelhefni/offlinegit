import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import ReposList from './components/ReposList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 className='text-4xl my-2 text-center mx-auto font-bold '>Offline Git</h1>
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
