// import { Box, Button, TextField } from "@mui/material";
// import axios from "axios";
// import { GetStaticProps } from "next";
// import React, { useState } from "react";
// import MainHome from "../components/home";
// import ProtectedRoute from "../components/routes/protected-route";

// const Home = () => {
//   return (
//     <div>
//       <ProtectedRoute>
//         <MainHome />
//       </ProtectedRoute>
//     </div>
//   );
// };

// export default Home;
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { GetStaticProps } from "next";
import React, { ReactElement, useEffect, useState } from "react";

interface ITodo {
  id: string;
  content: string;
  createdAt: string;
}

interface ITodoListItemProps {
  // todo: ITodo;
  todo: string;
  // onUpdate: (todo: ITodo) => void;
  // onDelete: (id: string) => void;
}
const sxRoot = {
  "& .MuiTextField-root": {
    margin: "10px",
    width: "25ch",
  },
};
const sxButton = { margin: "10px" };

const Home = () => {
  // const Home: React.FC<ITodoListItemProps> = ({ todo, onUpdate, onDelete }) => {
  // const Home: React.FC<ITodoListItemProps> = ({
  //   todo,
  // }): ReactElement<any, any> | null => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState<string>("");

  const handleEdit = () => {
    // setEditing(true);
  };

  const handleCancel = () => {
    // setEditing(false);
    // setText(todo.text);
  };

  const handleSave = () => {
    // setEditing(false);
    // onUpdate({ id: todo.id, text });
  };

  return <div>{"dddddd"}</div>;

  // editing ? (
  //   <Box sx={sxRoot}>
  //     <TextField
  //       label="Todo"
  //       value={text}
  //       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //         setText(e.target.value)
  //       }
  //     />
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       onClick={handleSave}
  //       sx={sxButton}
  //     >
  //       Save
  //     </Button>
  //     <Button variant="contained" onClick={handleCancel} sx={sxButton}>
  //       Cancel
  //     </Button>
  //   </Box>
  // ) : (
  //   <Box sx={sxRoot}>
  //     <div>{todo.content}</div>
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       onClick={handleEdit}
  //       sx={sxButton}
  //     >
  //       Edit
  //     </Button>
  //     <Button
  //       variant="contained"
  //       color="secondary"
  //       // onClick={() => onDelete(todo.id)}
  //       sx={sxButton}
  //     >
  //       Delete
  //     </Button>
  //   </Box>
  // );
};

// export const getStaticProps: GetStaticProps = async () => {
//   // const { data } = await axios.get(`${process.env.SERVER_LOCAL_URl}/deal`);
//   const { data } = await axios.get(`${process.env.SERVER_LOCAL_URl}`);
//   return {
//     props: {
//       todos: data,
//     },
//   };
// };

export default Home;
