import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Box,
  FormControl,
} from "@mui/material";

const sxRoot = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "50px",
};
const sxForm = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const sxInput = { margin: "10px" };
const sxButton = { margin: "10px" };

interface IUser {
  id: number;
  name: string;
}

const AdminPage: React.FC = () => {
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
    <Box sx={sxRoot}>
      <FormControl onSubmit={handleSubmit} sx={sxForm}>
        <TextField
          sx={sxInput}
          label="User name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button sx={sxButton} type="submit" variant="contained">
          Submit
        </Button>
      </FormControl>
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
    </Box>
  );
};

export default AdminPage;
