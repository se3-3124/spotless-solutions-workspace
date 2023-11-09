import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [connectable, setConnectable] = useState(false)

  useEffect(() => {
      async function tryCall() {
          const req = await axios.get<{text: string}>('/api/hello-world')
          return req.data.text === 'hello world'
      }

      tryCall().then(r => setConnectable(r)).catch(console.error)
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
          Is connectable to backend API:&nbsp;
          {connectable
              ? (<span style={{color: 'green', fontWeight: 'bold'}}>YES</span>)
              : (<span style={{color: 'red', fontWeight: 'bold'}}>NO</span>)
          }
      </p>
    </>
  )
}

export default App
