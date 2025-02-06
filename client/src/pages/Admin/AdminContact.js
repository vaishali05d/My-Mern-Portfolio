import React from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from 'axios';
import { message } from 'antd';

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  console.log('Portfolio Data:', portfolioData.contact);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contact._id,
      });
      dispatch(HideLoading())
      if (response.data.success) {
        message.success(response.data.message)
      } else {
        message.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.contact}>
        
        <Form.Item name='name' label="Name">
          <Input placeholder=' Name' />
        </Form.Item>
        <Form.Item name='gender' label="Gender">
          <Input placeholder='Gender' />
        </Form.Item>
        <Form.Item name='age' label="Age">
          <Input.TextArea placeholder='Age' />
        </Form.Item>
        <Form.Item name='linkedIn' label="LinkedIn URL">
          <Input.TextArea placeholder='LinkedIn URL' />
        </Form.Item>
        <Form.Item name='mobile' label="Mobile">
          <Input.TextArea placeholder='Mobile' />
        </Form.Item>
        <Form.Item name='country' label="Country">
          <Input.TextArea placeholder= "Country"/>
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className='px-5 py-2 bg-primary text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminContact;
