import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: "10px",
  },
  button: {
    margin: "10px",
  },
});

interface IUser {
  id: number;
  name: string;
}

const UserPage: React.FC = () => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await axios.post("http://localhost:5000/user", { name: inputValue });
    setInputValue("");
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/user/${id}`);
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          className={classes.input}
          label="User name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button className={classes.button} type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <Table>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserPage;
