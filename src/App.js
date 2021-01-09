import React, { useEffect, useState } from "react";
import { CssBaseline, Card, Typography, Divider, List, ListItem, Checkbox, ListItemIcon, ListItemText, TextField, Box, Button, IconButton, ListItemSecondaryAction } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import ListCRUD from "./ListCRUD";

const list = new ListCRUD();

function App() {
  const [listItens, setListItens] = useState([]);
  
  useEffect(() => {
    list.getList().then((value) => setListItens(value));
  },[]);

  async function postTodo(todo) {
    await list.postListItem({text: todo});
    const updatedList = await list.getList();
    setListItens(updatedList);
  };

  async function deleteTodo(id) {
    await list.deleteListItem(id);
    const updatedList = await list.getList();
    setListItens(updatedList);
  };

  function handleSendButton() {
    const str = document.getElementById("new-task").value;
    postTodo(str);
  };

  function handleDeleteButton(id) {
    deleteTodo(id);
  };

  return (
    <div className="App">
      <CssBaseline />
      <Card style={{width: 500, margin: 'auto', marginTop: 50, backgroundColor: 'lightgrey'}}>
        <Typography style={{marginTop: 20}} align="center" variant="h3">To Do List</Typography>
        <List>
          {listItens.map((item, i) => (
              <ListItem key={item.id}>
                <ListItemIcon>
                  <Checkbox />
                </ListItemIcon>
                <ListItemText>
                  {item.text}
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton onClick={() => handleDeleteButton(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
          ))}
        </List>
      </Card>
      <Box display="flex" style={{width: 500, margin: 'auto', marginTop: 20}}>
        <TextField id="new-task" label="New task" variant="outlined" fullWidth></TextField>
        <IconButton onClick={handleSendButton} color="secondary">
          <SendIcon />
        </IconButton>
      </Box>
    </div>
  );
}

export default App;