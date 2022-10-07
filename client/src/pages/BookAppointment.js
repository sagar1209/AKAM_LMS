import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";


function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [data, setData] = useState("");
  
  // const fun = (event) => {
  //   setData(document.getElementById('reason').innerHTML);
  //   console.log(data);
  // }

  const { user } = useSelector((state) => state.user);
  
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
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

  const v = (e) => {
    setData(e.target.value);
  }
  const bookNow = async (e) => {
    // e.preventDefault();

    // var d = document.getElementById('reason').value;
    // console.log(d);
    // setData(d);
    // console.log(data);

    
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          fromDate: fromDate,
          toDate: toDate,
          // time: time,
          reason : data,
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
        // navigate('/appointments')
      }
    } catch (error) {
      toast.error("Error Apply Leave");
      dispatch(hideLoading());
    }
    // console.log(data);
  };

  // const [toDate, setToDate]= useState("")
  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">

         
            <Col span={8} sm={24} xs={24} lg={15}>
            

              <div className="d-flex flex-column pt-2 mt-2 mx-5 w-100">
                <h6>From</h6>
                <DatePicker className="mb-4"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setfromDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                    // setToDate();
                  }}
                />
                <h6>To</h6>
                <DatePicker className="mb-4"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    settoDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                <h6>Reason for Leave</h6>
                <textarea name="reason" id="reason" cols="30" rows="10" placeholder="Type here" onChange={v}></textarea>
                {/* <p>{data}</p> */}
                {!isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Apply Now
                  </Button>
                )}
              </div>
            </Col>
           
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;