import React from "react";

const Home = ({ user }) => {
  return (
    <>
      <h1>Stranger Danger!</h1>
      {user && <h3>Welcome {user.username}!</h3>}
      <b>
        Click Posts at the top to explore posts created by other users just like
        you!
      </b>
    </>
  );
};

export default Home;
