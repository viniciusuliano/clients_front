import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg">
                <p className="text-lg font-bold text-black">{message}</p>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">Cancelar</button>
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Deletar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal; 