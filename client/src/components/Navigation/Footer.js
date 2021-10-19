import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import {
  SearchIcon,
  ChatAlt2Icon,
  NewspaperIcon,
} from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Footer = ({ auth: { isAuthenticated, loading }, logout }) => {
  const footerlinks = (
    <Fragment>
      <Link
        to="/feed"
        className="hover:bg-gray-100 px-3 py-2 flex justify-center"
      >
        <button>
          <NewspaperIcon className="h-6 w-6" />
        </button>
      </Link>
      <Link
        to="/players"
        className="hover:bg-gray-100 px-3 py-2 flex justify-center"
      >
        <button>
          <SearchIcon className="h-6 w-6" />
        </button>
      </Link>
      <Link
        to="/friends"
        className="hover:bg-gray-100 px-3 py-2 flex justify-center"
      >
        <button>
          <ChatAlt2Icon className="h-6 w-6" />
        </button>
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="fixed bottom-0 left-0 block w-full lg:hidden bg-white ">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="grid grid-cols-3 divide-x divide-gray-200 h-12">
            {!isAuthenticated ? null : footerlinks}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Footer.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Footer);
