import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [people, setPeople] = useState([]);
  const [formData, setFormData] = useState({
    name: 'Daniel',  
    phone: '',       
    egresso: false,
    pago: false,
    photo: '',
    cep: '',
    city: '',
    neighborhood: '',
    street: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPeople([...people, formData]);
    

    setFormData({
      name: '',
      phone: '',      
      egresso: false,
      pago: false,
      photo: '',
      cep: '',
      city: '',
      neighborhood: '',
      street: '',
    });
  };

  const handleCepFetch = () => {
    const cep = formData.cep.replace('-', '');
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setFormData({
              ...formData,
              city: data.localidade,
              neighborhood: data.bairro,
              street: data.logradouro,
            });
          } else {
            alert('CEP não encontrado');
          }
        })
        .catch((error) => console.error('Erro ao buscar CEP:', error));
    } else {
      alert('CEP inválido');
    }
  };

  return (
    <div className="App">
      {}
      <h1 className="welcome-title">Seja bem-vindo, {formData.name || 'Convidado'}!</h1>

      <header className="App-header">
        {}
        <div className="cards">
          {people
            .sort((a, b) => a.name.localeCompare(b.name)) 
            .map((person, index) => (
              <div key={index} className="card">
                <img src={person.photo} alt={person.name} />
                <h2>{person.name}</h2>
                <p>{person.phone}</p> {}
                <p>{person.egresso ? 'Egresso/Convidado' : 'Estudante'}</p>
                <p>{person.pago ? 'Confirmado' : 'Não Confirmado'}</p>
                <p>{person.city} - {person.neighborhood} - {person.street}</p>
              </div>
          ))}
        </div>

        {}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label>Telefone:</label> {}
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label>Egresso/Convidado:</label>
            <input 
              type="checkbox" 
              name="egresso" 
              checked={formData.egresso} 
              onChange={handleChange} 
            />
          </div>

          <div>
            <label>Pago:</label>
            <input 
              type="checkbox" 
              name="pago" 
              checked={formData.pago} 
              onChange={handleChange} 
            />
          </div>

          <div>
            <label>Foto (URL):</label>
            <input 
              type="text" 
              name="photo" 
              value={formData.photo} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label>CEP:</label>
            <input 
              type="text" 
              name="cep" 
              value={formData.cep} 
              onChange={handleChange} 
              required 
            />
            <button type="button" onClick={handleCepFetch}>Localizar</button>
          </div>

          <div>
            <label>Cidade:</label>
            <input 
              type="text" 
              name="city" 
              value={formData.city} 
              readOnly 
            />
          </div>

          <div>
            <label>Bairro:</label>
            <input 
              type="text" 
              name="neighborhood" 
              value={formData.neighborhood} 
              readOnly 
            />
          </div>

          <div>
            <label>Rua/Av:</label>
            <input 
              type="text" 
              name="street" 
              value={formData.street} 
              readOnly 
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </header>
    </div>
  );
}

export default App;
