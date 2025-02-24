import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const View = () => {
    const [userData, setUserData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert("No token found. Please login again.");
                    return;
                }

                const res = await axios.get('http://localhost:8000/expensedetail', {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                });

                console.log("Fetched Data:", res.data);

                // If there's no data or data doesn't exist in the expected format
                const data = res.data.data || res.data || [];
                setUserData(data);

                // Calculate totals
                let income = 0;
                let expenses = 0;
                data.forEach(item => {
                    if (item.amount > 0) {
                        income += item.amount;
                    } else {
                        expenses += item.amount;
                    }
                });

                setTotalIncome(income);
                setTotalExpenses(expenses);
                setBalance(income + expenses);

            } catch (err) {
                console.error('Error fetching expenses:', err.response?.data || err.message);
            }
        };

        fetchExpenses();
    }, []);

    const deletedata = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.delete(`http://localhost:8000/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Expense item Deleted:", res.data);
            alert("Expense item deleted successfully");

            // Update UI after deletion
            setUserData(prevData => prevData.filter(expense => expense._id !== id));

        } catch (error) {
            console.error("Error deleting expense:", error.response?.data || error.message);
            alert("Failed to delete expense");
        }
    };

    return (
        <>
            <div className=''>
                <Container className="mt-5">
                    <Row className="d-flex justify-content-center">

 

                                <Row>
                                    
                                    <div className="mb-4 d-flex justify-content-center"> 
                                    <Col md={4}>
                                <h4>Total Income: ${totalIncome.toFixed(2)}</h4>
                                </Col>
                                <Col md={4}>
                                <h4>Total Expenses: ${totalExpenses.toFixed(2)}</h4></Col>
                                <Col md={4}> <h4>Balance: ${balance.toFixed(2)}</h4>
                             </Col></div></Row>

                        <h3 className='d-flex justify-content-center'>Expense List:</h3>
                        {userData.length === 0 ? (
                            <h3 className="text-center text-muted">No Expenses Found</h3>
                        ) : (
                            userData.map((expense, id) => (
                                <Col key={id} md={6} lg={4} className="mb-4">
                                    <Card className="shadow-sm border-0 bg-transparent">
                                        <Card.Body>
                                            <Card.Title className="fw-bold">
                                                {expense.expense_description || 'No Description'}
                                            </Card.Title>
                                            <Card.Text>
                                                <strong>Amount:</strong>
                                                <div style={{ color: expense.amount > 0 ? '#27ae60' : '#FF0000' }}>
                                                    ${expense.amount || "0.00"}
                                                </div>
                                                <br />
                                                <strong>Date:</strong> {expense.date ? new Date(expense.date).toLocaleDateString() : "N/A"}
                                            </Card.Text>
                                            <div className="d-flex justify-content-start">
                                                <Button
                                                    variant="primary"
                                                    onClick={() => navigate(`/upgrade/${expense._id}`)}
                                                    className='mx-2'>
                                                    <FiEdit />
                                                </Button>
                                                <Button variant="danger" onClick={() => deletedata(expense._id)}>
                                                    <RiDeleteBinLine />
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default View;
