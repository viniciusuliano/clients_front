import { useState, useEffect } from 'react';
import { ClientData } from '../../types/ClientData';
import InputMask from 'react-input-mask';
interface UpdateClientModalProps {
    clientId: number;
    isOpen: boolean;
    onClose: () => void;    
    onUpdate: (updatedClient: ClientData) => void;
}

const UpdateClientModal: React.FC<UpdateClientModalProps> = ({ clientId, isOpen, onClose, onUpdate }) => {
    const [clientData, setClientData] = useState<ClientData>({
        name: '',
        email: '',
        cpf: '',
        phone: '',
    });


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/client/${clientId}`)
            .then(response => response.json())
            .then(data => setClientData(data))
            .catch(error => console.error('Erro ao buscar dados do cliente:', error));
    }, [clientId]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUpdate(clientData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h1 className="text-3xl font-semibold mb-6 text-center text-orange-500">Atualizar Cliente</h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={clientData.name}
                        onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                        className="bg-gray-100 border border-gray-300 text-black p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Nome"
                    />
                    <input
                        type="email"
                        value={clientData.email}
                        onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                        className="bg-gray-100 border border-gray-300 text-black p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Email"
                    />
                    <InputMask
                        mask="999.999.999-99"
                        value={clientData.cpf}
                        onChange={(e) => setClientData({ ...clientData, cpf: e.target.value })}
                        className="bg-gray-100 border border-gray-300 text-black p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="CPF"
                    />
                    <InputMask
                        mask="(99) 99999-9999"
                        value={clientData.phone}
                        onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                        className="bg-gray-100 border border-gray-300 text-black p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Telefone"
                    />
                    <button type="submit" className="bg-orange-500 text-white p-3 rounded-lg w-full hover:bg-orange-600 transition duration-300">Atualizar</button>
                    <button type="button" onClick={onClose} className="bg-red-500 text-white p-3 rounded-lg w-full hover:bg-red-600 transition duration-300">Fechar</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateClientModal;