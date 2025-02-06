import { Form, Input, message, Modal } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

function AdminProjects() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { project } = portfolioData;
    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [type, setType] = React.useState('add');

    const onFinish = async (values) => {
        try {
            const tempTechnologies = values?.technologies?.split(",") || [];
            values.technologies = tempTechnologies;
            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post("https://mern-portfolio-iuun.onrender.com/api/portfolio/update-project", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("https://mern-portfolio-iuun.onrender.com/api/portfolio/add-project", values);
            }

            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModel(false);
                setSelectedItemForEdit(null);
                dispatch(HideLoading());
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
            const response = await axios.post("/api/portfolio/delete-project", {
                _id: item._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    return (
        <div>
            <div className="flex justify-end ">
                <button className='bg-primary px-5 py-2 text-white' onClick={() => {
                    setSelectedItemForEdit(null);
                    setShowAddEditModel(true);
                }}>Add project</button>
            </div>
            <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
                {project.map((proj) => (
                    <div key={proj.id} className='shadow border border-gray-400 p-5 '>
                        <h1 className='text-cyan-500 text-xl font-bold '>{proj.title}</h1>
                        <hr />
                        <img src={proj.image} alt="" />
                        <h1 className='mt-3'>{proj.description}</h1>
                        <div className="flex justify-end gap-3 mt-5">
                            <button className='bg-cyan-500 text-primary px-5 py-2'
                                onClick={() => {
                                    onDelete(proj);
                                }}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2' onClick={() => {
                                setSelectedItemForEdit(proj);
                                setShowAddEditModel(true);
                                setType('edit');
                            }}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            {
                (type === 'add' ||
                selectedItemForEdit) && <Modal
                visible={showAddEditModel}
                title={selectedItemForEdit ? "Edit project" : "Add project"}
                footer={null}
                onCancel={() => {
                    setShowAddEditModel(false);
                    setSelectedItemForEdit(null);
                }}
            >
                <Form
                    layout='vertical'
                    onFinish={onFinish}
                    initialValues={
                        {
                            ...setSelectedItemForEdit,
                            technologies : selectedItemForEdit?.technologies.join(" , "),
                        } || {}
                    }
                >
                    <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Please input the title!' }]}>
                        <Input placeholder='Title' />
                    </Form.Item>
                        
                    <Form.Item name='image' label='Image URL' rules={[{ required: true, message: 'Please input the company!' }]}>
                        <Input placeholder='Image URL' />
                    </Form.Item>
                    
                    <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Please input the description!' }]}>
                        <TextArea placeholder='Description' />
                    </Form.Item>

                    <Form.Item name='technologies' label='Technologies'>
                        <Input placeholder='Technologies' />
                    </Form.Item>
                    <Form.Item name='link' label='Link'>
                        <Input placeholder='Project Link' />
                    </Form.Item>

                    <div className="flex justify-end">
                        <button className='border-primary text-primary px-5 py-2' onClick={() => {
                            setShowAddEditModel(false);
                            setSelectedItemForEdit(null);
                        }}>Cancel</button>
                        <button className='bg-primary text-white px-5 py-2' htmlType="submit">
                            {selectedItemForEdit ? "Update" : "Add"}
                        </button>
                    </div>
                </Form>
            </Modal>
            }
            
        </div>
    );
}

export default AdminProjects;
