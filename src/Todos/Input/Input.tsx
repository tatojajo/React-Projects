import { useState } from "react"
import { Add } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import axios from "axios"

const Input  = ()=>{
    const [inputValue, setInpitValue] = useState('')

    const handleAddTodo = async()=>{
        const newTodo = await axios.post('https://dummyjson.com/todos/add',{
            todo:inputValue,
            userId:5,
            completed:false
        })

    }
    return(
        <Box>
         
        </Box>
    )
}

export default Input