import { ListItem, Checkbox, ListItemIcon, ListItemText, IconButton, ListItemSecondaryAction, makeStyles, ListItemAvatar, Avatar } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from "react";

export default function TodoListItem({ item, deleteTodo }) {

    const [checked, setChecked] = useState(false);

    const useStyles = makeStyles((theme) => ({
        text: {
            textDecoration: checked ? "line-through" : "none",
        },
        img: {
            marginRight: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    function handleDeleteButton(id) {
        deleteTodo(id);
    };

    function handleChange(event) {
        setChecked(event.target.checked);
    };

    return (
        <ListItem>
            <ListItemIcon>
                <Checkbox checked={checked} onChange={handleChange} />
            </ListItemIcon>
            <ListItemText className={classes.text} >
                {item.text}
            </ListItemText>
            {item.img ?
                <ListItemAvatar className={classes.img}>
                    <IconButton>
                        <Avatar src={item.img} variant="rounded"/>
                    </IconButton>
                </ListItemAvatar> : null
            }
            <ListItemSecondaryAction>
                <IconButton onClick={() => handleDeleteButton(item.id)}>
                    <DeleteIcon color="secondary" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}