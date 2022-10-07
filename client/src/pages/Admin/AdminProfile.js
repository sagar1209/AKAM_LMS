import React from 'react';
import Layout from '../../components/Layout'

const adminProfile =() => {
    return (
        <Layout>
                <h4>Admin Details</h4>
                <div className="manager">
                    <div className='mname'>
                        <label>Admin Name : </label>
                        <p className='m_name'></p>
                    </div>
                    <div className='memail'>
                        <label>Admin E-mail  : </label>
                        <p className='m_email'></p>
                    </div>
                    <div className='memail'>
                        <label>Phone no. : </label>
                        <p className='m_email'></p>
                    </div>
                </div>
    
        </Layout>
      );
}

export default adminProfile;