import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientsModal from '../Clients'; 
import ConfirmationModal from '../../components/ConfirmationModal'; // Import the modal component
import UpdateClientModal from '../../components/ui/updateClientModal'; // Import the update client modal
import { ClientData } from '../../types/ClientData';

interface Client {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
}

type NewClient = Omit<Client, 'id'>;

function Home() {
    const [clients, setClients] = useState<Client[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 10; 
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<number | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [clientToEdit, setClientToEdit] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllClients = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/client');
            setClients(response.data);
        } catch (error) {
            console.error('There was an error fetching the clients!', error);
        }
    };

    useEffect(() => {
        fetchAllClients();
    }, []);

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleSearch = async (term: string) => {
        if (term.trim() === '') {
            fetchAllClients();
            setErrorMessage('');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/client/${term}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar cliente');
            }
            const cliente = await response.json();
            if (!cliente) {
                toast.error('Cliente não encontrado');
                setErrorMessage('Cliente não encontrado');
                return;
            }
            setClients([cliente]);
            setErrorMessage('');
        } catch {
            toast.error('Cliente não encontrado');
            setErrorMessage('Cliente não encontrado');
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleDelete = async (clientId: number) => {
        setClientToDelete(clientId);
        setIsConfirmationOpen(true);
    };

    const confirmDelete = async () => {
        if (clientToDelete === null) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/client/${clientToDelete}`);
            setClients(clients.filter(client => client.id !== clientToDelete));
            toast.success('Cliente deletado com sucesso!');
        } catch {
            toast.error('Erro ao deletar cliente');
        } finally {
            setIsConfirmationOpen(false);
            setClientToDelete(null);
        }
    };

    const handleCreateClient = async (newClient: NewClient) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/client', newClient);
            setClients(prevClients => [...prevClients, response.data]);
            toast.success('Cliente criado com sucesso!');
        } catch {
            toast.error('Erro ao criar cliente');
        }
    };

    const handleUpdateClient = async (updatedClient: ClientData) => {
        setIsLoading(true);
        try {
            await axios.put(`http://127.0.0.1:8000/api/client/${clientToEdit}`, updatedClient);
            setClients(prevClients => 
                prevClients.map(client => 
                    client.id === clientToEdit ? { ...client, ...updatedClient } : client
                )
            );
            toast.success('Cliente atualizado com sucesso!');
        } catch {
            toast.error('Erro ao atualizar cliente');
        } finally {
            setIsLoading(false);
            setIsUpdateModalOpen(false);
        }
    };

    return (
        <section className="flex justify-center">
            <div className="w-full max-w-4xl">
                {isLoading && <div className="loading-spinner">Loading...</div>}
                <div className="flex items-center justify-center mt-4 gap-4">
                    <button 
                        className="bg-white text-black px-4 py-2 rounded-full w-10 h-10 hover:bg-gray-200"
                        onClick={() => setIsModalOpen(true)} 
                    >
                        + 
                    </button>
                    <input
                        type="text"
                        placeholder="Pesquisar clientes"
                        className="bg-transparent border rounded-full text-white w-96 h-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={() => handleSearch(searchTerm)}>
                        <FontAwesomeIcon icon={faSearch} className="mr-2 text-white" />
                    </button>
                </div>
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
                                    <button onClick={() => {
                                        setClientToEdit(client.id);
                                        setIsUpdateModalOpen(true);
                                    }}>
                                        <FontAwesomeIcon icon={faEdit} className="text-blue-500 hover:scale-110" />
                                    </button>
                                    <button onClick={() => handleDelete(client.id)}>
                                        <FontAwesomeIcon icon={faTrash} className="text-red-500 hover:scale-110" />
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
                            className={`px-4 py-2 mx-1 ${currentPage === number + 1 ? 'bg-blue-500' : 'bg-white'} text-black rounded-full hover:bg-gray-200`}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
                <ToastContainer />
            </div>
            <ClientsModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onCreate={handleCreateClient} 
            />
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={confirmDelete}
                message="Tem certeza que deseja deletar este cliente?"
            />
            {isUpdateModalOpen && clientToEdit !== null && (
                <UpdateClientModal
                    clientId={clientToEdit}
                    isOpen={isUpdateModalOpen}
                    onUpdate={handleUpdateClient}
                    onClose={() => setIsUpdateModalOpen(false)}
                />
            )}
        </section>
    );
}

export default Home;