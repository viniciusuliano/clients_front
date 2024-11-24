import { Button, Stack, Table } from "@chakra-ui/react";
import axios from "axios";
import { HiTrash } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import {useEffect, useState, useCallback} from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import DeleteClient from "./delete-client";


interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

function TableHome(){
  
  const [clientes, setClientes] = useState<Client[]>([])  
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const getAllClients = useCallback( async () => {
    try{
      const response = await axios.get<Client[]>("http://127.0.0.1:8000/api/client")
      if(!response){
        throw new Error("Erro na requisição")
      }
      setClientes(response.data)
    }catch(error){
      console.error(error)
    }
  }, []);

  useEffect(() => {
    getAllClients()
  }, [getAllClients])
  
  return (
<Stack w="full" mt={10}>
          <Table.Root>
            <Table.Header>
              <Table.Row h="100px">
                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Telefone</Table.ColumnHeader>
                <Table.ColumnHeader>CPF</Table.ColumnHeader>
                <Table.ColumnHeader>Ações</Table.ColumnHeader>
                <Table.ColumnHeader>Financeiro</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {clientes.map((cliente: Client) => (
                <Table.Row key={cliente.id}>
                  <Table.Cell>{cliente.name}</Table.Cell>
                  <Table.Cell>{cliente.email}</Table.Cell>
                  <Table.Cell>{cliente.phone}</Table.Cell>
                  <Table.Cell>{cliente.cpf}</Table.Cell>
                  <Table.Cell w="full" display="flex" gap={2}>
                    <Button color="yellow.500"><GoPencil /></Button>
                    <Button 
                      color="red.500" 
                      onClick={() => setSelectedClientId(cliente.id)}
                    >
                      <HiTrash />
                    </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button color="green.500"><MdOutlineAttachMoney /></Button>
                </Table.Cell>
              </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          {selectedClientId && (
            <DeleteClient 
              id={selectedClientId} 
              onClose={() => setSelectedClientId(null)}
            />
          )}
      </Stack>
  )       
}

export default TableHome;