import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const View = () => {

    const [userData, setUserData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        showUsers()
    }, [])

    const showUsers = () => {
        axios.get('http://localhost:8000/expensedetail')
            .then(res => {
                // console.log(userData)
                setUserData(res.data.data);

            })
            .catch(err => {
                console.log(err);
            })
    }
    const deletedata = (id) => {
        axios.delete(`http://localhost:8000/delete/${id}`)
            .then(res => {
                console.log("expense item Deleted:", res.data)
                alert("expense item Delete");
                showUsers()

            })
            .catch(error => {
                console.error("Error deleting expense:", error);
            })
    }

    return (
        <>
        <div className='view_container'>

            <Container className="mt-5 ">
                <Row className="d-flex justify-content-center">
                    <h3 className='d-flex justify-content-center'>Expense List:</h3>
                    {userData.length === 0 ? (
                        <h3 className="text-center text-muted">No Expenses Found</h3>
                    ) : (
                        userData.map((expense, id) => (
                            <Col key={id} md={6} lg={4} className="mb-4">
                                <Card className="shadow-sm border-0 d-flex justify-content-center bg-transparent">
                                    <Card.Body>
                                        <Card.Title className="fw-bold">{expense.expense_description}</Card.Title>
                                        <Card.Text>
                                            <strong>Amount:</strong> ${expense.amount}
                                            <br />
                                            <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
                                        </Card.Text>
                                        <div className="d-flex justify-content-start">
                                            <Button
                                                variant="primary"
                                                onClick={() => navigate(`/upgrade/${expense._id}`)}
                                                className='mx-2' >
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
            </Container></div>
        </>


    )
}

export default View;
