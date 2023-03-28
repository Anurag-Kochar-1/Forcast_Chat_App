import './App.css'
import { useState } from 'react'
import Layout from './layout/layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <h1 className='text-7xl'> Hello </h1>
    </Layout>
  )
}

export default App
