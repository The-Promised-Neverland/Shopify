import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct_ADMINS_ONLY, listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'


const ProductListScreen_ADMINS = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { id } = useParams()

    // to show if a user is currently logged in or not
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList


    const deleteHandler = (productID) => {
        if (window.confirm(`Are you sure?`)) {
            dispatch(deleteProduct_ADMINS_ONLY(productID))
        }
    }

    useEffect(() => {
        if (!userInfo || userInfo.isAdmin === false) { // if not admin or not logged in
            navigate('/login')
        }
        else {
            dispatch(listProducts())
        }
    }, [dispatch, navigate, userInfo])




    const createProductHandler = () => {

    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'></i>Create Product</Button>
                </Col>
            </Row>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((eachProduct) => (
                                    <tr key={eachProduct._id}>
                                        <td>{eachProduct._id}</td>
                                        <td>{eachProduct.name}</td>
                                        <td>
                                            ${eachProduct.price}
                                        </td>
                                        <td>
                                            {eachProduct.category}
                                        </td>
                                        <td>
                                            {eachProduct.brand}
                                        </td>
                                        <td>
                                            {/* No permission to delete or edit an admin */}
                                            <LinkContainer to={`/admin/product/${eachProduct._id}/edit`}>
                                                <Button variant='white' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(eachProduct._id)}>
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

export default ProductListScreen_ADMINS
