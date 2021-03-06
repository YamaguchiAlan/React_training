import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToPops = state => {
    return {
        username: state.userReducer.user.username,
        verified: state.userReducer.user.verified,
        id: state.userReducer.user._id,
        date: state.userReducer.user.updatedAt
    }
}

const User = ({ username, verified, id, date, editMode }) => (
    <div className="user-profile">
        {
            verified === false ?
                <>

                    <Link to="/signin">
                        <img src="/img/default-profile-pic.jpg" alt="imagen de usuario" />
                    </Link>

                    <table className="user-text">
                        <tbody>

                            <tr className="user-name">
                                <td colSpan="2">
                                    <span className="user-name">
                                        Anonymous
                                </span>
                                </td>
                            </tr>

                            <tr className="sign">
                                <td>
                                    <Link to="/signin" className="sign-in">
                                        Sign-In
                                </Link>
                                </td>
                                <td>
                                    <Link to="/signup" className="sign-up">
                                        Sing-Up
                                </Link>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </>
                :
                <>
                    <Link to="/my-profile">
                        <img src={`${process.env.REACT_APP_API_URL}/api/users/${id}/image?${date}`} alt="imagen de usuario" />
                    </Link>

                    <table className="user-text">
                        <tbody>

                            <tr className="user-name">
                                <td colSpan="2">
                                    <Link to="/my-profile" className="user-name">
                                        {username}
                                    </Link>
                                </td>
                            </tr>
                            <tr className="sign">
                                <td>
                                    <Link to="/my-profile" className="sign-in">
                                        View Profile
                                </Link>
                                </td>
                                <td>
                                {
                                    editMode ?
                                        <Link to="/" className="sign-up">
                                            Home
                                        </Link>
                                    :
                                        <Link to="/edit-articles/Article" className="sign-up">
                                            Editor Mode
                                        </Link>
                                }
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </>
        }
    </div>
)

export default connect(mapStateToPops)(User);