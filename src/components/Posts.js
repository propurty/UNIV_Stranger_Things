import React from "react";
import PostItem from "./PostItem";

const Posts = ({ post }) => {
  console.log("Posts", post);

  return (
    <div>
      {post.map((item) => {
        return <PostItem key={item._id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
