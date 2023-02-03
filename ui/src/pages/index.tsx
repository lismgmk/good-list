import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { GetStaticProps } from "next";
import { Button, TextField } from '@mui/material';

interface ITodo {
  id: string;
  text: string;
}

interface ITodoListItemProps {
  todo: ITodo;
  onUpdate: (todo: ITodo) => void;
  onDelete: (id: string) => void;
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const TodoListItem: React.FC<ITodoListItemProps> = ({
  todo,
  onUpdate,
  onDelete,
}) => {
  const classes = useStyles();
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
    <div className={classes.root}>
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
        className={classes.button}
      >
        Save
      </Button>
      <Button
        variant="contained"
        onClick={handleCancel}
        className={classes.button}
      >
        Cancel
      </Button>
    </div>
  ) : (
    <div className={classes.root}>
      <div>{todo.text}</div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEdit}
        className={classes.button}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onDelete(todo.id)}
        className={classes.button}
      >
        Delete
      </Button>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get("http://localhost:5000/deals");
  return {
    props: {
      todos: data,
    },
  };
};

export default TodoListItem;
