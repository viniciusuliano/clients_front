import { Button, Stack, Table } from "@chakra-ui/react";
import axios from "axios";
import { HiTrash } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import {useEffect, useState} from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

function TableHome(){

  const getAllClients = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/client");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  const [clientes, setClientes] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await getAllClients();
      setClientes(response);
    };
    
    fetchClients();
  }, []);

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
                    <Button color="red.500"><HiTrash /></Button>
                </Table.Cell>
                <Table.Cell>
                  <Button color="green.500"><MdOutlineAttachMoney /></Button>
                </Table.Cell>
              </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
    )       
}

export default TableHome;