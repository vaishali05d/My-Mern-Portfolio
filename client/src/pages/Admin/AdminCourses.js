import { Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

function AdminCourses() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { courses } = portfolioData;
    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [form] = Form.useForm();  // Create a form instance

    const onFinish = async (values) => {
        try {
            const tempTechnologies = values?.technologies?.split(",") || [];
            values.technologies = tempTechnologies;
            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post("https://mern-portfolio-iuun.onrender.com/api/portfolio/update-courses", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("https://mern-portfolio-iuun.onrender.com/api/portfolio/add-courses", values);
            }

            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                form.resetFields();  // Reset form fields after submission
                setShowAddEditModel(false);
                setSelectedItemForEdit(null);
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onDelete = async (item) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/portfolio/delete-courses", {
                _id: item._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const handleModalCancel = () => {
        form.resetFields();  // Reset form fields when modal is closed
        setShowAddEditModel(false);
        setSelectedItemForEdit(null);
    };

    return (
        <div>
            <div className="flex justify-end">
                <button className='bg-primary px-5 py-2 text-white' onClick={() => {
                    setSelectedItemForEdit(null);
                    setShowAddEditModel(true);
                }}>Add Courses</button>
            </div>
            <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
                {courses.map((course) => (
                    <div key={course.id} className='shadow border border-gray-400 p-5'>
                        <h1 className='text-cyan-500 text-xl font-bold'>{course.title}</h1>
                        <hr />
                        <img src={course.image} alt={course.title} />
                        <h1 className='mt-3'>{course.description}</h1>
                        <div className="flex justify-end gap-3 mt-5">
                            <button className='bg-cyan-500 text-primary px-5 py-2' onClick={() => onDelete(course)}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2' onClick={() => {
                                setSelectedItemForEdit(course);
                                setShowAddEditModel(true);
                                form.setFieldsValue({
                                    title: course.title,
                                    image: course.image,
                                    description: course.description,
                                    technologies: course.technologies.join(", "),
                                });  // Set form values for editing
                            }}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            {
                (selectedItemForEdit || showAddEditModel) && (
                    <Modal
                        visible={showAddEditModel}
                        title={selectedItemForEdit ? "Edit Courses" : "Add Courses"}
                        footer={null}
                        onCancel={handleModalCancel}  // Reset form on cancel
                    >
                        <Form
                            form={form}  // Connect form instance
                            layout='vertical'
                            onFinish={onFinish}
                        >
                            <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Please input the title!' }]}>
                                <Input placeholder='Title' />
                            </Form.Item>

                            <Form.Item name='image' label='Image URL' rules={[{ required: true, message: 'Please input the image URL!' }]}>
                                <Input placeholder='Image URL' />
                            </Form.Item>

                            <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Please input the description!' }]}>
                                <TextArea placeholder='Description' />
                            </Form.Item>

                            <div className="flex justify-end">
                                <button className='border-primary text-primary px-5 py-2' onClick={handleModalCancel}>Cancel</button>
                                <button className='bg-primary text-white px-5 py-2' htmlType="submit">
                                    {selectedItemForEdit ? "Update" : "Add"}
                                </button>
                            </div>
                        </Form>
                    </Modal>
                )
            }
        </div>
    );
}

export default AdminCourses;
