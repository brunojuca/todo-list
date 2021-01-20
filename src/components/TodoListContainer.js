import { useState, useEffect } from "react";
import { makeStyles, Box, Card, Typography, List } from "@material-ui/core";
import NewTodoInput from "./NewTodoInput";
import TodoListItem from "./TodoListItem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        margin: "auto",
        marginTop: 50,
    },
    card: {
        backgroundColor: theme.palette.primary.main,
    }
}));


export default function TodoListContainer({ list }) {

    const [listItens, setListItens] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        list.getList().then((value) => setListItens(value));
    }, [list]);

    async function postTodo(todo, img) {
        await list.postListItem({ text: todo, img: img });
        const updatedList = await list.getList();
        setListItens(updatedList);
    };

    async function deleteTodo(id) {
        await list.deleteListItem(id);
        const updatedList = await list.getList();
        setListItens(updatedList);
    };

    return (
        <Box className={classes.root}>
            <Card className={classes.card}>
                <Typography style={{ marginTop: 20 }} align="center" variant="h3">To Do List</Typography>
                <List>
                    {listItens.map((item, i) => (
                        <TodoListItem key={item.id} item={item} deleteTodo={deleteTodo} />
                    ))}
                </List>
            </Card>
            <NewTodoInput postTodo={postTodo} />
        </Box>
    );
}