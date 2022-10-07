import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/DoctorForm";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/update-doctor-profile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-user-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <Layout>
      {/* <h1 className="page-title">Manager Profile</h1>
      <hr />
      {doctor && <DoctorForm onFinish={onFinish} initivalValues={doctor} />} */}
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
                <label>Your Class : </label>
                <p className='uclass'></p>
            </div>

            <hr />

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
            </div>

        </div>
    </Layout>
  );
}

export default Profile;