import React from 'react';
import { Nav } from 'react-bootstrap';

const Checkout = ({ login, shipping, payment, orders }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                <Nav.Link
                    disabled={!login}
                    style={{ cursor: 'default' }}
                    className={login ? 'bounce-up-link' : ''}
                >
                    Sign In
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link
                    disabled={!shipping}
                    style={{ cursor: 'default' }}
                    className={shipping ? 'bounce-up-link' : ''}
                >
                    Shipping
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link
                    disabled={!payment}
                    style={{ cursor: 'default' }}
                    className={payment ? 'bounce-up-link' : ''}
                >
                    Payment
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link
                    disabled={!orders}
                    style={{ cursor: 'default' }}
                    className={orders ? 'bounce-up-link' : ''}
                >
                    Order
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Checkout;
