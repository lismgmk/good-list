import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";

interface ITodo {
  id: string;
  text: string;
}

interface ITodoListItemProps {
  todo: ITodo;
  onUpdate: (todo: ITodo) => void;
  onDelete: (id: string) => void;
}
const sxRoot = {
  "& .MuiTextField-root": {
    margin: "10px",
    width: "25ch",
  },
};
const sxButton = { margin: "10px" };

// const MainHome = () => {
const MainHome: React.FC<ITodoListItemProps> = ({
  todo,
  onUpdate,
  onDelete,
}) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setText(todo.text);
  };

  const handleSave = () => {
    setEditing(false);
    onUpdate({ id: todo.id, text });
  };

  return editing ? (
    <Box sx={sxRoot}>
      <TextField
        label="Todo"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={sxButton}
      >
        Save
      </Button>
      <Button variant="contained" onClick={handleCancel} sx={sxButton}>
        Cancel
      </Button>
    </Box>
  ) : (
    <Box sx={sxRoot}>
      <div>{todo.text}</div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEdit}
        sx={sxButton}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onDelete(todo.id)}
        sx={sxButton}
      >
        Delete
      </Button>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get("http://localhost:5000/admin/users");
  return {
    props: {
      todos: data,
    },
  };
};

export default MainHome;
