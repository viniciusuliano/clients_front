import { Input, Button } from "@chakra-ui/react";
import {DialogContent, DialogRoot, DialogHeader, DialogBody, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";

interface FormCreateClientProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateClient(){
    try{
        axios.create({
            baseURL: "http://127.0.0.1:8000/api/client"
        })
        toaster.success({
            title: `Cliente cadastrado com sucesso`,
            type: "success",
        })
    } catch (error) {
        console.error(error);
        toaster.error({
            title: `Erro ao cadastrar cliente`,
            type: "error",
        })
    }
}

function FormCreateClient({isOpen, onClose}: FormCreateClientProps){
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Cadastrar Cliente</DialogTitle>
        </DialogHeader>
        <DialogBody>
            <Input mt={4} type="text" placeholder="Nome" />
            <Input mt={4} type="email" placeholder="Email" />
            <Input mt={4} type="tel" placeholder="Telefone" />
            <Input mt={4} type="text" placeholder="CPF" />
        </DialogBody>
        <DialogFooter>
            <Button colorScheme="green" onClick={CreateClient}>Cadastrar</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default FormCreateClient;
