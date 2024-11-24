import { DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog";
import {toaster } from "@/components/ui/toaster";
import { Button } from "@chakra-ui/react";
import axios from "axios";

interface DeleteClientProps {
  id: number;
  onClose: () => void;
}

const handleDeleteClient = async (id: number, onClose: () => void) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/client/${id}`);
    onClose();
    toaster.success({
        title: 'Cliente deletado com sucesso',
        type: 'success',
        duration: 3000
    });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    toaster.error({
        title: 'Erro ao deletar cliente',
        type: 'error',
        duration: 3000
    });
  }
}

function DeleteClient({ id, onClose }: DeleteClientProps) {
  return (
    <DialogRoot open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Cliente</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>Tem certeza que deseja deletar o cliente?</p>
        </DialogBody>
        <DialogFooter>
          <Button onClick={onClose}>Cancelar</Button>
          <Button 
            colorScheme="red" 
            onClick={() => handleDeleteClient(id, onClose)}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default DeleteClient;
