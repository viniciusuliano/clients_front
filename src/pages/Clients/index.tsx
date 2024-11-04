import axios from 'axios';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Client } from '../../types/NewClient';

interface ClientsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (newClient: Client) => Promise<void>;
}

function ClientsModal({ isOpen, onClose }: ClientsModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    console.log(errorMessage);

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
                onClose();
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 422) {
                    setErrorMessage('CPF já existe!');
                    toast.error('CPF já existe!');
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h1 className="text-3xl font-semibold mb-6 text-center text-orange-500">Novo Cliente</h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <input className="bg-gray-100 border border-gray-300 text-black p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" type="text" name="name" placeholder="Nome" onChange={handleChange} value={formData.name} />
                    <InputMask mask="999.999.999-99" className="bg-gray-100 border border-gray-300 text-black p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" type="text" name="cpf" placeholder="CPF" onChange={handleChange} />
                    <input className="bg-gray-100 border border-gray-300 text-black p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" type="text" name="email" placeholder="Email" onChange={handleChange} />
                    <InputMask mask="(99) 99999-9999" className="bg-gray-100 border border-gray-300 text-black p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" type="text" name="phone" placeholder="Telefone" onChange={handleChange} />
                    <button className="bg-orange-500 text-white p-3 rounded-lg w-full hover:bg-orange-600 transition duration-300" type="submit">Criar</button>
                </form>
                <button className="mt-6 bg-red-500 text-white p-3 rounded-lg w-full hover:bg-red-600 transition duration-300" onClick={onClose}>Fechar</button>
                <ToastContainer />
            </div>
        </div>
    );
}

export default ClientsModal;
