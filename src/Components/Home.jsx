import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Card, CardBody } from "react-bootstrap";
import axios from "axios";
// import View from './View';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const [expense_description, setExpense] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const userData = {
            expense_description,
            amount,
            date
        }

        axios
            .post("http://localhost:8000/addlogin", userData)
            .then((res) => {
                console.log(res.data);
                alert("Expenses Added successfully");
                setExpense("");
                setAmount("");
                setDate("");

            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <div className="expense-container">
                <Container className="d-flex justify-content-center align-items-center min-vh-100 ">
                    <Card className="shadow border-2 bg-transparent p-4 text-white-50 fs-4 w-100">
                        <CardBody>
                            <h2 className="text-center mb-4 fb-2">Add Expenses</h2>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formBasicExpense">
                                            <Form.Label>Income</Form.Label>

                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formBasicExpense">
                                            <Form.Label>Total Expenses</Form.Label>

                                        </Form.Group></Col></Row>
                                {/* Expense Description */}
                                <Form.Group controlId="formBasicExpense">
                                    <Form.Label>Expense Description</Form.Label>
                                    <Form.Control
                                        className="bg-transparent rounded-5 text-white-50 fs-5"
                                        type="text"
                                        placeholder="Enter your expenses"
                                        value={expense_description}
                                        required
                                        onChange={(e) => setExpense(e.target.value)}
                                    />
                                </Form.Group>

                                {/* Amount */}
                                <Form.Group controlId="formBasicAmount" className="mt-3">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control
                                        className="bg-transparent text-white-50 rounded-5 fs-5"
                                        type="text"
                                        placeholder="Enter amount"
                                        value={amount}
                                        required
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </Form.Group>

                                {/* Date */}
                                <Form.Group controlId="formBasicDate" className="mt-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        className="bg-transparent text-white-50 rounded-5 fs-5"
                                        type="date"
                                        value={date}
                                        required
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>

                                {/* Submit Button */}
                                <div className="text-center mt-4">
                                    <Row><Col>
                                        <Button
                                            className="w-75 bg-transparent text-white-75 border-2 rounded-2 fs-4"
                                            variant="dark"
                                            type="submit"
                                        >
                                            Add
                                        </Button></Col>
                                        <Col>
                                            <Button
                                                className="w-75 bg-transparent text-white-75 border-2 rounded-2 fs-4"
                                                variant="dark"
                                                type="submit" onClick={() => navigate(`View`)}>
                                                View
                                            </Button>
                                        </Col></Row>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default Home
