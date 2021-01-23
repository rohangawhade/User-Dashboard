import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col  from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { firestore } from './Firebase';
import {toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';


toast.configure()

function Dashboard() {
    const [ fullName, setFullName ] = useState("");
    const [ emailId, setemailId ] = useState("");
    const [ username, setusername ] = useState("");
    const [ phone, setPhone ] = useState("");

    const ResetForm = () => {
        setFullName("");
        setemailId("");
        setusername("");
        setPhone("");
    }

    const ShowToast = (p) => {
        if(p){
            toast('Successfully inserted');
        }else{
            toast('Try Again');
        }
    }
    const FormSubmit = (e) => {
        e.preventDefault();
        const data = firestore.collection('UserInfo');
        data.add({
            FullName: fullName,
            username: username,
            Email: emailId,
            Contact: phone
        }).then(() => {
            ShowToast(true);
            ResetForm();
        })
        .catch(() => {
            ShowToast(false);
        })
    }

    return (
        <div className="container">
            <h1 className='header'>Enter Details</h1>
            <Form onSubmit={FormSubmit}>
                <Form.Group className='form'>
                    <Form.Row className='row'>
                        <Form.Label className='label' column lg={3}>Full Name</Form.Label>
                        <Col>
                            <Form.Control type="text" value={fullName} required onChange={e => setFullName(e.target.value)} />
                        </Col>
                    </Form.Row>
                    <Form.Row className='row'>
                        <Form.Label className='label' column lg={3}>Email</Form.Label>
                        <Col>
                            <Form.Control type="email" value={emailId} required onChange={e => setemailId(e.target.value)} />
                        </Col>
                    </Form.Row>
                    <Form.Row className='row'>
                        <Form.Label className='label' column lg={3}>Username</Form.Label>
                        <Col>
                            <Form.Control type="text" value={username} required onChange={e => setusername(e.target.value)} />
                        </Col>
                    </Form.Row>
                    <Form.Row className='row'>
                        <Form.Label className='label' column lg={3}>Contact Number</Form.Label>
                        <Col>
                            <Form.Control type="number" value={phone} required onChange={e => setPhone(e.target.value)} />
                        </Col>
                    </Form.Row>
                    <Form.Row className='row'>
                        <Button type="submit" className='submitBtn' variant="outline-primary">Submit</Button>
                    </Form.Row>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Dashboard
