import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
// import Spinner from "../spinner/Spinner";
import {
  BriefcaseIcon,
  LocationMarkerIcon,
  PencilIcon,
} from "@heroicons/react/solid";

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div>
      <Fragment>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  {user.name}
                </h2>
                {profile !== null ? (
                  <Fragment>
                    <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <BriefcaseIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {profile.level}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <LocationMarkerIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {profile.location}
                      </div>
                    </div>
                    <p className="mt-4">{profile.bio}</p>
                  </Fragment>
                ) : (
                  <p className="mt-3 text-black dark:text-white text-base sm:text-xl lg:text-base xl:text-xl truncate">
                    Please add info to your profile
                  </p>
                )}
              </div>

              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <span className="sm:block">
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
                </span>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
    </div>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
