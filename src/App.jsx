import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Api from './services/api';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleSearch() {
    if (input === '') {
      alert('Informe o CEP');
      return;
    }
    try {
      const response = await Api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('Ops, erro ao discar o CEP');
      setInput('');
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Encontre seu CEP</h1>

        <div className="container-input">
          <input
            type="text"
            placeholder="Digite seu CEP..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="btn-source" onClick={handleSearch}>
            <FiSearch size={25} color="#fff" />
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>
              {cep.localidade} - {cep.uf}
            </span>
          </main>
        )}
      </div>
    </>
  );
}

export default App;
