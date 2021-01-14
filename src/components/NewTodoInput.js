import { makeStyles, Box, TextField, IconButton} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
    },
}));

export default function NewTodoInput({ postTodo }) {

    const classes = useStyles();

    function handleSendButton() {
        const str = document.getElementById("new-task").value;
        postTodo(str);
    };

    return (
        <Box display="flex" className={classes.root}>
            <TextField id="new-task" label="New task" variant="outlined" fullWidth></TextField>
            <IconButton onClick={handleSendButton} color="secondary">
                <SendIcon />
            </IconButton>
        </Box>
    );
}