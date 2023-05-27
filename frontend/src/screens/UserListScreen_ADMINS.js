import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteUser_ADMINS_ONLY, listUsers_ADMINS_ONLY } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'


const UserListScreen_ADMINS = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector((state) => state.userList)
    const { loading, error, users, success } = userList


    const deleteHandler = (userID) => {
        if (window.confirm('Are you sure?')) {
            dispatch(DeleteUser_ADMINS_ONLY(userID))
        }
    }

    useEffect(() => {
        if (!userInfo || userInfo.isAdmin === false) { // if not admin or not logged in
            navigate('/')
        }
        else {
            dispatch(listUsers_ADMINS_ONLY())
        }
    }, [dispatch, success, navigate])

    return (
        <>
            <h1>Users</h1> 
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((eachUser) => (
                            <tr key={eachUser._id}>
                                <td>{eachUser._id}</td>
                                <td>{eachUser.name}</td>
                                <td><a href={`mailto:${eachUser.email}`}>{eachUser.email}</a></td>
                                <td>
                                    {eachUser.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/users/${eachUser._id}/edit`}>
                                        <Button variant='white' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(eachUser._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen_ADMINS