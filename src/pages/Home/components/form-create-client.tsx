import { Input, Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import {DialogContent, DialogRoot, DialogHeader, DialogBody, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
interface FormCreateClientProps {
  isOpen: boolean;
  onClose: () => void;
}

async function CreateClient(name: string, email: string, phone: string, cpf: string){
    try{
        const response = await axios.post("http://127.0.0.1:8000/api/client", {
            name,
            email,
            phone,
            cpf
        })
        if(!response){
            throw new Error("Erro na requisição")
        }

        if(response){
            toaster.create({
                title: "Cliente cadastrado com sucesso",
                type: "success",
                duration: 5000,
            })
        }
        
    } catch (error) {
        console.error(error);
        toaster.create({
            title: "Erro ao cadastrar cliente",
            type: "error",
            duration: 5000,
        })
    }
}

function FormCreateClient({isOpen, onClose}: FormCreateClientProps){
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  

  function handleCreateClient(){
  CreateClient(name, email, phone, cpf)
  }
  
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Cadastrar Cliente</DialogTitle>
        </DialogHeader>
        <DialogBody>
            <Input mt={4} type="text" placeholder="Nome" onChange={e => setName(e.target.value)} />
            <Input mt={4} type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <Input mt={4} type="tel" placeholder="Telefone"onChange={e => setPhone(e.target.value)} />
            <Input mt={4} type="text" placeholder="CPF" onChange={e => setCpf(e.target.value)}/>
        </DialogBody>
        <DialogFooter>
            <Button colorScheme="green" onClick={handleCreateClient}>Cadastrar</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default FormCreateClient;
