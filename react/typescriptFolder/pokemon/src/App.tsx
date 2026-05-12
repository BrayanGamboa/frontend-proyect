import { useState } from 'react'
import './App.css'
import { Pokedex } from './Pokedex'
import { UserSchema } from './schema/UserSchema'
import { FastForm } from './components/FastForm';

function App() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  return (
    <>
      {/* <Pokedex /> */}
      <img src="https://cdn-icons-png.flaticon.com/512/306/306047.png" alt="Escudo" />
      <input type="number" value={value} onChange={(e) =>{
        setValue(e.target.value);

        const result = UserSchema.shape.points.safeParse(Number(value));

        setError(!result.success ? "❌":"✅");
      }}/>
      {error && <p style={{color: 'red'}}>{error}</p>}


      <FastForm />
    </>
  )
}

export default App
