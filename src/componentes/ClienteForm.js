// src/componentes/ClienteForm.js
import React, { useState } from 'react';

const ClienteForm = ({ onCadastro }) => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        onCadastro({ nome, telefone });
        setNome('');
        setTelefone('');
    };

    const handleNomeChange = (e) => {
        const value = e.target.value
            setNome(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,nome:null}))
            } else {
                if(value==="") {
                    setErrors((prev)=>({...prev,nome:'Nome do doador não pode estar vazio.'}))
                } else {
                    setErrors((prev)=>({...prev,nome:'Nome do doador não pode exceder 50 caracteres.'}))
                }
            }
    }

    const handleTelefoneChange = (e) => {
        const value = e.target.value
            setTelefone(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,telefone:null}))
            } else {
                if(value==="") {
                    setErrors((prev)=>({...prev,telefone:'Telefone não pode estar vazio.'}))
                } else {
                    setErrors((prev)=>({...prev,telefone:'Telefone não pode exceder 50 caracteres.'}))
                }
            }
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de Cliente</h2>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={handleNomeChange}
                isInvalid={!!errors.nome}
                required
            />
            <input
                type="tel"
                placeholder="Telefone"
                value={telefone}
                onChange={handleTelefoneChange}
                isInvalid={!!errors.telefone}
                required
            />
            <button type="submit">Cadastrar Cliente</button>
        </form>
    );
};

export default ClienteForm;
