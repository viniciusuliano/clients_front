import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Client {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
}

function Home() {
    const [clients, setClients] = useState<Client[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 10; 
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/client')
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the clients!', error);
            });
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            const fetchAllClients = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/client');
                    setClients(response.data);
                } catch {
                    console.error('There was an error fetching the clients!');
                }
            };
            fetchAllClients();
        }
    }, [searchTerm]);

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleSearch = async (term: string) => {
        if (term.trim() === '') {
            setErrorMessage('');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/client/${term}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar cliente');
            }
            const cliente = await response.json();
            setClients([cliente]);
            setErrorMessage('');
        } catch {
            toast.error('Cliente não encontrado');
        }
    };

    const handleDelete = async (clientId: number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/client/${clientId}`);
            setClients(clients.filter(client => client.id !== clientId));
            toast.success('Cliente deletado com sucesso!');
        } catch {
            toast.error('Erro ao deletar cliente');
        }
    };

    return (
        <section className="flex justify-center">
            <div className="w-full max-w-4xl">
                <div className="flex items-center justify-center mt-4 gap-4">
                    <button 
                        className="bg-white text-black px-4 py-2 rounded-full w-10 h-10"
                        onClick={() => navigate('/clients')}
                    >
                        + 
                    </button>
                    <input
                        type="text"
                        placeholder="Pesquisar clientes"
                        className="bg-transparent border rounded-full text-white w-96 h-10"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handleSearch(e.target.value);
                        }}
                    />
                    <button onClick={() => handleSearch(searchTerm)}>
                        <FontAwesomeIcon icon={faSearch} className="mr-2 text-white" />
                    </button>
                </div>
                {errorMessage && (
                    <div className="text-red-500 text-center mt-4">
                        {errorMessage}
                    </div>
                )}
                <table className="min-w-full bg-transparent mt-4">
                    <thead>
                        <tr>
                            <th className="text-white text-left px-4 py-2">ID</th>
                            <th className="text-white text-left px-4 py-2">Nome</th>
                            <th className="text-white text-left px-4 py-2">Email</th>
                            <th className="text-white text-left px-4 py-2">CPF</th>
                            <th className="text-white text-left px-4 py-2">Telefone</th>
                            <th className="text-white text-left px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClients.map((client: Client) => (
                            <tr key={client.id} className="text-white border-b border-gray-700">
                                <td className="px-4 py-2">{client.id}</td>
                                <td className="px-4 py-2">{client.name}</td>
                                <td className="px-4 py-2">{client.email}</td>
                                <td className="px-4 py-2">
                                    <InputMask mask="999.999.999-99" value={client.cpf} disabled className="bg-transparent border-none text-white" />
                                </td>
                                <td className="px-4 py-2">
                                    <InputMask mask="(99) 99999-9999" value={client.phone} disabled className="bg-transparent border-none text-white" />
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button onClick={() => navigate(`/edit/${client.id}`)}>
                                        <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                                    </button>
                                    <button onClick={() => handleDelete(client.id)}>
                                        <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end mt-4">
                    {[...Array(Math.ceil(clients.length / clientsPerPage)).keys()].map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number + 1)}
                            className={`px-4 py-2 mx-1 ${currentPage === number + 1 ? 'bg-blue-500' : 'bg-white'} text-black rounded-full`}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
                <ToastContainer />
            </div>
        </section>
    );
}

export default Home;