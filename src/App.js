import React from "react";
import { CssBaseline } from "@material-ui/core";
import ListCRUD from "./CRUD/ListCRUD";
import { TodoListContainer } from "./components";

const list = new ListCRUD();

function App() {

    return (
        <div className="App">
            <CssBaseline />
            <TodoListContainer list={list} />        
        </div>
    );
}

export default App;