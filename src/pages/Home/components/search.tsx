import { Input} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "../../../components/ui/input-group";
function SearchBar(){
    return (
        <InputGroup w="1/2" bg="primary" startElement={<LuSearch/>}>      
            <Input w="full" placeholder="Pesquisar clientes" />
        </InputGroup>
    )
}

export default SearchBar;