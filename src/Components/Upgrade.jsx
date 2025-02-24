import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, CardBody } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Upgrade = () => {
    const navigate = useNavigate();
    const { _id } = useParams();

    const [expense_description, setExpense] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    // Format date to yyyy-MM-dd
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for months
        const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
        return `${year}-${month}-${day}`;
    };

    // Fetch user data
    useEffect(() => {
        axios.get(`http://localhost:8000/getexpensedata/${_id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(res => {
                console.log("Fetched Data:", res.data);
                const data = res.data.Userdata;

                // Populate state with fetched data
                setExpense(data.expense_description || "");
                setAmount(data.amount || "");
                setDate(formatDate(data.date || ""));


            })
            .catch(error => {
                console.log(error);
            });

    }, [_id]); // Dependency array ensures this runs only when `_id` changes


    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            expense_description,
            amount,
            date

        };

        axios.put(`http://localhost:8000/update/${_id}`,  userData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Add Authorization header
                }
            }
        )
       
            .then((res) => {
                
                console.log(res.data);
                alert("Data updated successfully");
                navigate("/View");
                // setExpense("");
                // setAmount("");
                // setDate("");

            })
            .catch((error) => {
                console.error("Error updating :", error);
            });
    };

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center view-container">
                <Col md={8}>
                    <Card className="my-4 shadow">
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <h1>Update Expenses</h1>
                                <Form.Group className="mb-3" controlId="formGridExpense">
                                    <Form.Label>Expense Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter expenses"
                                        value={expense_description}
                                        onChange={(e) => setExpense(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridAmount">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button className="align-items-center align-center w-25  border-2 rounded-5 fs-4 mt-4" variant="success" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Upgrade;
