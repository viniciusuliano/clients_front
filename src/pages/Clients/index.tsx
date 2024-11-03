import axios from 'axios';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Clients() {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/client', formData);
            console.log('Client created:', response.data);
            setErrorMessage('');
            toast.success('Cliente criado com sucesso!');
            setTimeout(() => {
                navigate('/');
            }, 2000); // Atraso de 2 segundos
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 422) {
                    setErrorMessage('Email já existe!');
                    toast.error('Email já existe!');
                } else if (error.response?.status === 409) {
                    const errorData = error.response?.data;
                    if (errorData?.email) {
                        setErrorMessage('Email inválido!');
                        toast.error('Email inválido!');
                    } else if (errorData?.cpf) {
                        setErrorMessage('CPF inválido!');
                        toast.error('CPF inválido!');
                    }
                } else {
                    console.error('Error response data:', error.response?.data);    
                    console.error('Error response status:', error.response?.status);
                    console.error('Error response headers:', error.response?.headers);
                }
            } else {
                console.error('There was an error creating the client!', error);
            }
        }
    };

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4 text-white">Novo cliente</h1>
            <form className="flex flex-col items-center justify-center gap-4 bg-gray-800 p-4 rounded-md w-1/2 h-1/2" onSubmit={handleSubmit}>
                <input className="bg-gray-200 border border-gray-700 text-black p-2 w-full rounded-md" type="text" name="name" placeholder="Nome" onChange={handleChange} value={formData.name} />
                <InputMask mask="999.999.999-99" className="bg-gray-200 border border-gray-700 text-black p-2 w-full rounded-md" type="text" name="cpf" placeholder="CPF" onChange={handleChange} />
                <input className="bg-gray-200 border border-gray-700 text-black p-2 w-full rounded-md" type="text" name="email" placeholder="Email" onChange={handleChange} />
                <InputMask mask="(99) 99999-9999" className="bg-gray-200 border border-gray-700 text-black p-2 w-full rounded-md" type="text" name="phone" placeholder="Telefone" onChange={handleChange} />
                <button className="bg-orange-500 text-white p-4 rounded-md w-1/2" type="submit">Criar</button>
            </form>
            <ToastContainer />
        </section>
    );
}

export default Clients;
