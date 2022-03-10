import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import Spinner from "../spinner/Spinner";
import {
  BriefcaseIcon,
  LocationMarkerIcon,
  PencilIcon,
  UserAddIcon,
} from "@heroicons/react/solid";

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <div>
      <Fragment>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 xs:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          </div>
        </header>
        {profile === null ? (
          <Spinner />
        ) : (
          <main>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="md:flex">
                    <img
                      className="h-10 w-10 rounded-full"
                      // src={avatar}
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <h2 className="md:ml-3 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                      {/* {name} */}
                    </h2>
                  </div>

                  {profile.bio !== null ? (
                    <Fragment>
                      <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <BriefcaseIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {profile.level}
                        </div>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <LocationMarkerIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {profile.location}
                        </div>
                      </div>
                      <p className="mt-4">{profile.bio}</p>
                      {profile._id !== auth.id ? (
                        <Link to="/profile-edit">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          >
                            <PencilIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                              aria-hidden="true"
                            />
                            Edit
                          </button>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          <UserAddIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                          Follow
                        </button>
                      )}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <p className="mt-3 text-black dark:text-white text-base sm:text-xl lg:text-base xl:text-xl truncate">
                        Please add info to your profile
                      </p>
                      <Link to="/profile-edit">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          <PencilIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                          Edit
                        </button>
                      </Link>
                    </Fragment>
                  )}
                </div>

                {/* <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <span className="sm:block">
                  {profile._id === user.id ? (
                    <Link to="/profile-edit">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        <PencilIcon
                          className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                        Edit
                      </button>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      <UserAddIcon
                        className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                      Follow
                    </button>
                  )}
                </span>
              </div> */}
              </div>
            </div>
          </main>
        )}
      </Fragment>
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
