import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import ReposList from './components/ReposList'
import { VscGithubAction } from "react-icons/vsc"
import { Repo } from './types/common'
import { get, set } from 'idb-keyval';

function App() {
  let [repos, setRepos] = useState(Array<Repo>)

  get("repositories").then(val => {
    if (val == undefined) {
      set("repositories", [])
      setRepos([])
    }
    setRepos(val)
  })


  return (
    <div className="App">
      <h1 className='text-5xl md:text-6xl my-5 text-center mx-auto font-bold flex items-center justify-center gap-2 '>
        <span>Offline Git</span>
        <VscGithubAction />
      </h1>
      <div className="flex flex-col gap-4 container mx-auto px-2 md:px-0">
        <div className="flex items-center justify-center">
          <SearchBar setRepos={setRepos} />
        </div>

        <ReposList repos={repos} />

      </div>
    </div>
  )
}

export default App
