import React from "react";
import { NavLink } from "react-router-dom";

const PostItem = ({ post, postHeader, children }) => {
  //TODO - Add time to post and format it to how recent it was posted. Like, "Posted 1 day ago."

  return (
    <div className='ui fluid card' id='postCard'>
      {/* <div className='ui top inverted attached block header'> */}

      <div className='ui top attached inverted header'>
        <div className='ui inverted segment' id='postCardHeader'>
          <h3 className='ui center aligned header' id='postTitle'>
            {post.title}
            {postHeader}
          </h3>
        </div>
      </div>

      <div className='content'>
        {/* <div className='right aligned tiny header'>{post.createdAt}</div>
        // Note - Date is too specific. Might want to install package to easily show time? */}
        <div className='centered aligned description'>
          <h4 className='tiny ui horizontal divider header'>
            <i className='tag icon'></i>
            Description
          </h4>

          <div className='ui padded raised segment' id='descriptionSegment'>
            <h4 className='ui center aligned header' id='description'>
              {post.description}
            </h4>
          </div>

          <h4 className='tiny ui horizontal fitted divider header'>
            <i className='bar chart icon'></i>
            Specifications
          </h4>

          <table className='small ui padded definition table'>
            <tbody>
              <tr>
                <td className='three wide column'>Location:</td>
                <td className=''>{post.location ? post.location : "---"}</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td>{post.willDeliver ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>Seller:</td>
                <td>{post.author.username}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>{post.price}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='ui hidden divider'></div>
        <div className='ui two column grid'>
          <div className='column'>{children}</div>
          <div className='column'>
            <NavLink to={`/posts/${post._id}`}>
              {({ isActive }) => (
                <a
                  className={
                    isActive ? null : "large ui blue right ribbon label"
                  }>
                  {isActive ? null : "Details "}
                  {isActive ? null : (
                    <i className='fitted angle right icon'></i>
                  )}
                </a>
              )}
            </NavLink>
          </div>
        </div>

        {post.messages.length > 0 ? (
          <h4 className=' tiny ui horizontal divider header'>
            <i className='users icon'></i>Messages
          </h4>
        ) : null}
        <div
          role='list'
          className='tiny ui list'
          style={{ color: "#444", clear: "both" }}>
          {post.messages.map((message) => {
            return (
              <div
                role='listitem'
                className='small ui message'
                key={message._id}>
                <p className='tiny ui secondary inverted blue left aligned header'>
                  {message.fromUser.username}
                </p>
                <p className='tiny ui left aligned raised segment'>
                  {message.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
