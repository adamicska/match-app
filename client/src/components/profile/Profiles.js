import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../spinner/Spinner";
import { getProfiles } from "../../actions/profile";
import { ChatAlt2Icon } from "@heroicons/react/solid";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {/* <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Players</h1>
            </div>
          </header> */}
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {profiles.length > 0 ? (
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            ></th>
                            <th
                              scope="col"
                              className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Level
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Country
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              City
                            </th>
                            <th scope="col" className="relative px-5 py-3">
                              <span className="sr-only">Connect</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {profiles.map((profile) => (
                            <tr key={profile.id}>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                      className="h-10 w-10 rounded-full"
                                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {profile.level}
                                </div>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {profile.country}
                                </div>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {profile.location}
                                </div>
                              </td>
                              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link to={`/profile/${profile._id}`}>
                                  <button
                                    href="#"
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                  >
                                    <ChatAlt2Icon className="flex-shrink-0 h-5 w-5 text-gray-700" />
                                  </button>
                                </Link>
                              </td>
                              <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link to={`/profile/${profile._id}`}>
                                  <button
                                    href="#"
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                  >
                                    Profile
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
