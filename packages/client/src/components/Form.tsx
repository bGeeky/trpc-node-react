import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { trpc } from "../trpc";

const initialFormState = {
  title: "",
  author: "",
  content: "",
};
const Form = () => {
  const [formState, setFormState] = useState(initialFormState);
  const mutation = trpc.createPost.useMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ ...formState });
    setFormState(initialFormState);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          width: "40%",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>Create a new post</h1>

        <FormControl fullWidth>
          <Grid container sx={{ flexDirection: "column" }} spacing={3}>
            <Grid item>
              <TextField
                fullWidth
                label="Title"
                name="title"
                variant="outlined"
                value={formState.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Content"
                multiline
                name="content"
                variant="outlined"
                value={formState.content}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Author"
                name="author"
                variant="outlined"
                value={formState.author}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
      {mutation.error && <p>{mutation.error.message}</p>}
    </div>
  );
};

export default Form;
