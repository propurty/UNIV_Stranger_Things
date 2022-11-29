import React from "react";

const Profile = ({ user }) => {
  //

  // Hey Chuck,
  //
  // I can't figure out why a duplicate message is always made.
  // I think it is because I tested messages by sending them to myself.
  // So it might actually work fine, you can test and see.
  //
  // The problem it causes is that I set the key in the map to be the message id,
  // so it is not unique. But I end up getting an error logged about two children
  // with the same key. Basically two duplicate messages are made with the same ID.
  //
  // Thanks.

  //

  return (
    <>
      <div className='container'>
        {user.messages.length == 0 ? (
          <h4
            className='ui centered dividing header'
            style={{
              marginTop: "8px",
              fontSize: "1.4em",
              fontWeight: "600",
              fontFamily: "Kalam",
            }}>
            You have {user.messages.length} messages.
          </h4>
        ) : null}
        <div className='ui centered grid' id='profileGrid'>
          <div
            className='ui padded piled segment'
            style={
              user.messages.length > 0
                ? { backgroundColor: "snow" }
                : { display: "none" }
            }>
            {user.messages.length > 0 ? (
              <h4
                className='ui horizontal divider header'
                style={{
                  marginTop: "8px",
                  fontSize: "1.4em",
                  fontWeight: "600",
                  fontFamily: "Kalam",
                }}>
                <i className='users icon'></i>
                {user.messages.length} Messages
              </h4>
            ) : null}
            <div role='list' className='ui cards' id='userMessageCards'>
              {user.messages.map((userMessage) => {
                return (
                  <div
                    role='listitem'
                    className='ui blue card'
                    key={userMessage._id}>
                    <div className='ui center aligned floated header'>
                      <h3
                        style={{
                          fontSize: "1.1em",
                          fontWeight: "400",
                          fontFamily: "Permanent Marker",
                          marginTop: "2px",
                        }}>
                        <i className='small tags blue icon'></i>
                        {userMessage.post.title}
                      </h3>
                    </div>
                    <div className='content'>
                      <p className='tiny ui secondary inverted blue left aligned header'>
                        {userMessage.fromUser.username}
                      </p>
                      <p className='ui message' id='profileMessage'>
                        <i className='grey comment outline icon'></i>
                        {userMessage.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <button
        className='ui circular icon button'
        data-tooltip='Back to top'
        data-inverted=''
        data-position='left center'
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        id='scrollButton'>
        <i className='big arrow alternate circle up outline icon'></i>
      </button>
    </>
  );
};

export default Profile;
