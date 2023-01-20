console.log('Started Uisng TypeScript')

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const listOfTodo = [
    {
        id: 1,
        title: 'first string',
        completed: true,
        userId: 1
    }
]

const todo = listOfTodo[0] as Todo;

const id = todo.id;
const title = todo.title;
const completed = todo.completed;

const logVars = (id: number, title: string, completed: boolean) => {
    console.log(`
        id: ${id}
        title: ${title}
        completed: ${completed}
    `)
}

logVars(id, title, completed)