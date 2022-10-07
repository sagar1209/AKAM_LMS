import React from 'react';
import Layout from '../components/Layout';

const profile = () => {
    return <>
        <Layout>
        <div className='container'>
            <div className='name'>
                <label>Name : </label>
                <p className='uname'></p>
            </div>
            <div className='email'>
                <label>E-mail : </label>
                <p className='uemail'></p>
            </div>
            <div className='phone'>
                <label>Phone no. : </label>
                <p className='uphone'></p>
            </div>
            <div className='class'>
                <label>Class : </label>
                <p className='uclass'></p>
            </div>

            <hr />

            <h4>Manager Details</h4>
            <div className="manager">
                <div className='mname'>
                    <label>Manager Name : </label>
                    <p className='m_name'></p>
                </div>
                <div className='memail'>
                    <label>Manager E-mail  : </label>
                    <p className='m_email'></p>
                </div>
            </div>

        </div>
        </Layout>
    </>
}

export default profile;