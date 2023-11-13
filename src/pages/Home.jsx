import { Button, Center, Text, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import TodoList from "../shared/ui/TodoList";

export const Home = () => (
    <Center h="100vh">
        <Stack>
            <Text textAlign="center">Старница Home</Text>

            <TodoList/>

            <Button as={Link} to="/asdfg" colorScheme="blue">
                Перейти на страницу 404
            </Button>
        </Stack>
    </Center>
)
