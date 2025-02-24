import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Card, CardBody } from "react-bootstrap";
import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const [expense_description, setExpense] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    // const [expensesData, setExpensesData] = useState([]);
    // const [totalIncome, setTotalIncome] = useState(0);
    // const [totalExpenses, setTotalExpenses] = useState(0);
    // const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('No token found. Please login again.');
                    return;
                }

                // const res = await axios.get('http://localhost:8000/expensedetail', {
                //     headers: { Authorization: `Bearer ${token}` }


            
                // const data = res.data;
                // setExpensesData(data);
                // // Calculate the total income, expenses, and balance
                // let income = 0;
                // let expenses = 0;

                // data.forEach(item => {
                //     if (item.amount > 0) {
                //         income += item.amount;
                //     } else {
                //         expenses += item.amount;
                //     }
                // });

                // setTotalIncome(income);
                // setTotalExpenses(expenses);
                // setBalance(income + expenses);

            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const token = localStorage.getItem('token'); // Retrieve token from local storage
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No token found. Please login again.');
                return;
            }
            const res = await axios.post('http://localhost:8000/add',
                {
                    expense_description,
                    amount,
                    date
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            //  setExpenseId(res.data._id); // Store the expense ID from the response
            console.log('Expense added:', res.data);
            //   setExpenseId(res.data._id); // Store the expense ID from the response
              alert("expenses added successfully");

            // Calculate the total income, expenses, and balance
            //  setExpensesData(prevData => Array.isArray(prevData) ? [...prevData, res.data] : [res.data]);

            //             // Recalculate totals after adding a new expense
            //             setTotalIncome(prevIncome => prevIncome + (amount > 0 ? parseFloat(amount) : 0)); // Ensure parsing as float
            //             setTotalExpenses(prevExpenses => prevExpenses + (amount < 0 ? parseFloat(amount) : 0)); // Ensure parsing as float
            //             setBalance(prevIncome => prevIncome + (amount > 0 ? parseFloat(amount) : 0) + (amount < 0 ? parseFloat(amount) : 0)); // Ensure parsing as floa

            // Clear the input fields
        } catch (error) {
            console.error('Error adding expense:', error.response?.data || error.message);
        }
        setExpense("");
        setAmount("");
        setDate("");
    };

    return (
        <>
            <div className="expense-container">
                <Container className="d-flex justify-content-center align-items-center min-vh-100 ">
                    
                    <Card className="shadow border-2 bg-transparent p-4 text-white-50 fs-4 w-100">
                        <CardBody>
                             <h2 className="text-center mb-4 fb-2">Add Expenses</h2>

                                
                            <Form onSubmit={handleSubmit}>
                                
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
                                        placeholder="Enter income in(+ve) and expense in (-ve)"
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
                                                type="submit" onClick={() => navigate(`/View`)}>
                                                View
                                            </Button>
                                        </Col></Row>
                                </div>
                            </Form>
                            
                        </CardBody>
                        <Row><Col md={12}>
                                        <Button
                                            className="align-items-center align-center w-25 bg-transparent text-white-75 border-2 rounded-5 fs-4 mt-4"
                                            variant="danger"
                                            type="submit"  onClick={() => navigate(`/AuthForm`)}
                                        >
                                            Logout
                                        </Button></Col></Row>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default Home
