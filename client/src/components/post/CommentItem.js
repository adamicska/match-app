import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import formatDate from "../../utils/formatDate";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
    <div className="px-4 pt-3 flex flex-row">
      <Link to={`/profile/${user}`}>
        <img
          className="inline-block h-6 w-6 rounded-full mb-1"
          src={avatar}
          alt={name}
        />
      </Link>
      <p className="text-xs text-gray-800 mt-1 ml-2">{formatDate(date)}</p>
    </div>
    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{text}</p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
