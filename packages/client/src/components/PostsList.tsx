import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { trpc } from "../trpc";

const PostsList = () => {
  const query = trpc.getPosts.useQuery();

  console.log("data", query.data?.data);
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {query.data?.data?.posts?.map((post) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={post.author} src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={post.title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`${post.author}-  `}
                  </Typography>
                  {post.content}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
};

export default PostsList;
