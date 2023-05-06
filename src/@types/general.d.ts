type Todo={
    userId:number
    id:number
    todo:string
    completed:boolean
}

type EditableTodo = {
    id:number
    todo:string
}

type InitialState = {
    todos:Todo[]
    editableTodo:EditableTodo
}