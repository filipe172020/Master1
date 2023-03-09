import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import 'App.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    // 31365150/json/
    if (input === '') {
      alert('Preencha o CEP!')
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('');
    }

    catch {
      alert('Ops! CEP não encontrado/inexistente')
      setInput('');
    }

  }

  return (
    <div className="container">
     
      <h1 className='title'>Procure um endereço</h1>

      <div className='Input_Main'>

        <input type='text' placeholder='Digite o CEP' value={input} onChange={(event) => setInput(event.target.value)} />


        <button className='Search_button' onClick={handleSearch}>
          <AiOutlineSearch size={25} color='#FFF' />

        </button>

      </div>


      {Object.keys(cep).length > 1 && (

        <div className='Main'>
          <h2>CEP:{cep.cep} </h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf} </span>
        </div>

      )}



    </div>







  );
}

export default App;
