import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList); // we are getting the states of products from the reducer in store.js
    const { loading, error, products } = productList  // destructuring the required states

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product.id} sm={13} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}
export default HomeScreen
