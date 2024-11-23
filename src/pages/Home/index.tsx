import SearchBar from "./components/search"
import TableHome from "./components/table-home"
import { FaUserPlus } from "react-icons/fa";
import FormCreateClient from "./components/form-create-client"
import { Button, Flex, HStack, Stack, } from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination" 
import { useState } from "react";

function Home(){
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Flex w="full" h="100vh" justify="start" align="center" direction="column" bg="blackAlpha.100" p={10}>
        <Flex w="full" gap={4}>
          <Button ml={4} color="green.500" onClick={() => setIsOpen(true)}>
            <FaUserPlus />
          </Button>
          <SearchBar/>
        </Flex>
        <Flex w="full">
          <TableHome />
        </Flex>
        <Stack w="full" align="end">
          <PaginationRoot count={10} pageSize={10} page={1} mt={10}>
            <HStack wrap="wrap">
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Stack>
        <FormCreateClient isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Flex>
  )
}

export default Home;