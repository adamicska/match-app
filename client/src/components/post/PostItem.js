import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

import { ThumbUpIcon, ChatAltIcon, TrashIcon } from "@heroicons/react/solid";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, title, avatar, user, likes, comments, date },
  showActions,
}) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
    <div className="px-4 py-5 sm:px-6">
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deletePost(_id)}
          type="button"
          className="float-right mr-1.5 h-5 w-5 text-gray-400 mb-2"
        >
          <TrashIcon />
        </button>
      )}
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      <Link to={`/profile/${user}`}>
        <img
          className="inline-block h-8 w-8 rounded-full"
          src={avatar}
          alt={name}
        />
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{name}</p>
      </Link>
    </div>
    <div className="aspect-w-4 aspect-h-2 bg-gray-100 overflow-hidden max-h-screen">
      {/* <img src={post.image} alt={post.title} className="object-center object-cover" /> */}
      <img
        src="https://source.unsplash.com/9BA0Kk7-nBY"
        alt={title}
        className="object-center object-cover"
      />
    </div>
    <div className="border-t border-gray-200">
      <dl>
        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {text}
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt>
            <button onClick={() => addLike(_id)} type="button">
              <ThumbUpIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 mb-2" />
            </button>
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <p className="mb-2">
              Liked by{" "}
              <span>
                {likes.length > 0 && <span>{likes.length}</span>} users
              </span>
            </p>
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            {/* {likes.user.avatar} */}
          </dd>
        </div>
        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <Link to={`/posts/${_id}`}>
              <ChatAltIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 mb-2" />
            </Link>
          </dt>
          <dd>
            <Link to={`/posts/${_id}`}>
              {comments.length > 0 && (
                <span className="ml-2">{comments.length} comments</span>
              )}
            </Link>
          </dd>
        </div>
      </dl>
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
