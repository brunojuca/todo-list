import { makeStyles, Box, TextField, IconButton } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
    },
    input: {
        display: 'none',
    },
}));

export default function NewTodoInput({ postTodo }) {

    const classes = useStyles();
    const [img, setImg] = useState("");

    function handleSendButton() {
        const str = document.getElementById("new-task").value; 
        postTodo(str, img);
    };

    function handleAttach() {
        const img = document.getElementById("icon-button-file").files[0];
        const imgReader = new FileReader();

        if (img) {
            imgReader.readAsDataURL(img);
            imgReader.onload = () => {
                setImg(imgReader.result);
            }
        }
    }

    return (
        <Box display="flex" className={classes.root}>
            <TextField id="new-task" label="New task" variant="outlined" fullWidth></TextField>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleAttach} />
            <label htmlFor="icon-button-file">
                <IconButton  color="primary" aria-label="upload picture" component="span">
                    <AttachFileIcon />
                </IconButton>
            </label>
            <IconButton onClick={handleSendButton} color="secondary">
                <SendIcon />
            </IconButton>
        </Box>
    );
}