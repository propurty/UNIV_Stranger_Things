import React from "react";

const Home = ({ user }) => {
  return (
    <>
      <h1>Stranger Danger!</h1>
      {user && <h2>Welcome {user.username}, you are now logged in.</h2>}
    </>
  );
};

export default Home;
