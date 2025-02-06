import React from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from 'axios';
import { message } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  console.log('Portfolio Data:', portfolioData.about); 

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(" , ");
      values.skills = tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-about", {
        ...values,
        _id: portfolioData.about._id,
      });
      dispatch(HideLoading());
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
      <Form onFinish={onFinish} layout='vertical' initialValues={{
        ...portfolioData.about,
        skills: portfolioData.about.skills.join(" , "),
      }}
      >
        <Form.Item name='lottieURL' label="Lottie URL">
          <Input placeholder='Lottie URL' />
        </Form.Item>
        <Form.Item name='description1' label="Description 1">
          <TextArea placeholder='Description 1' />
        </Form.Item>
        <Form.Item name='description2' label="Description 2">
          <TextArea placeholder='Description 2' />
        </Form.Item>
        <Form.Item name='skills' label="Skills">
          <TextArea placeholder='Skills' />
        </Form.Item>
        
        <div className="flex justify-end w-full">
          <button className='px-5 py-2 bg-primary text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
