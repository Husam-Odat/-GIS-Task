import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Form 'react-bootstrap/Form';

const Form = (props) => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
        Notes: '',
        LAT: '',
        LNG: '',
    });
    const [updatingId, setUpdatingId] = useState(null);
    const [updatedFormData, setUpdatedFormData] = useState({
        Name: '',
        Notes: '',
        LAT: '',
        LNG: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (updatingId !== null) {
            setUpdatedFormData({ ...updatedFormData, [name]: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/maps');
            setData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:3001/maps/${itemId}`);
            fetchData(); // Fetch and update the data after a successful deletion
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const updateItem = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.patch(`http://localhost:3001/maps/${updatingId}`, updatedFormData, config);
            fetchData(); // Fetch and update the data after a successful update
            setUpdatingId(null); // Clear the updating state
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.post('http://localhost:3001/maps', formData, config);
            fetchData(); // Fetch and update the data after a successful submission
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch initial data when the component mounts
    }, []);

    return (
        <div>
            <div>
                <h6>Latitude and Longitude:</h6>
                <p>Latitude: {props.position.lat}  Longitude: {props.position.lng}</p>

                {/* You can add more form fields or input elements here */}
            </div>

            <h5>Data Form</h5>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="Name" for="Name" class="form-label">Name:</label>
                    <input type="text" id="Name" name="Name"
                        value={formData.Name}
                        onChange={handleChange} class="form-control" placeholder="Name" />
                </div>
                {/* <div>
                    <label htmlFor="Name">Name:</label>
                    <input
                        class="form-label"
                        type="text"
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                    />
                </div> */}

                {/* <div>
                    <label htmlFor="Notes">Notes:</label>
                    <textarea
                        id="Notes"
                        name="Notes"
                        value={formData.Notes}
                        onChange={handleChange}
                    />
                </div> */}
                <div class="mb-3">
                    <label htmlFor="Notes" for="Notes" class="form-label">Notes:</label>
                    <input type="text" id="Notes" name="Notes"
                        value={formData.Notes}
                        onChange={handleChange} class="form-control" placeholder="Notes" />
                </div>

                <div class="mb-3">
                    <label htmlFor="LAT" for="LAT" class="form-label">LAT:</label>
                    <input type="number" id="LAT" name="LAT"
                        value={formData.LAT = props.position.lat}
                        onChange={handleChange} class="form-control" placeholder="LAT" />
                </div>
                {/* <div>
                    
                    <label htmlFor="LAT">LAT:</label>
                    <input
                        type="text"
                        id="LAT"
                        name="LAT"
                        value={formData.LAT = props.position.lat}
                        onChange={handleChange}
                    />
                </div> */}

                {/* <div>
                    <label htmlFor="LNG">LNG:</label>
                    <input
                        type="text"
                        id="LNG"
                        name="LNG"
                        value={formData.LNG = props.position.lng}
                        onChange={handleChange}
                    />
                </div> */}
                <div class="mb-3">
                    <label htmlFor="LNG" for="LNG" class="form-label">LNG:</label>
                    <input type="number" id="LNG" name="LNG"
                        value={formData.LNG = props.position.lng}
                        onChange={handleChange} class="form-control" placeholder="LNG" />
                </div>
                <button class="btn btn-primary btn-xs" type="submit">Submit</button>

                {/* <button type="submit">Submit</button> */}
            </form>

            <div>
                <h3>Data Table</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Notes</th>
                            <th>LAT</th>
                            <th>LNG</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.ID}>
                                <td>{item.ID}</td>
                                <td>{item.Name}</td>
                                <td>{item.Notes}</td>
                                <td>{Math.floor(item.LAT * 1000) / 1000}</td>
                                <td>{Math.floor(item.LNG * 1000) / 1000}</td>

                                <td>
                                    <button onClick={() => deleteItem(item.ID)} class="btn btn-danger btn-sm">Delete</button>

                                    {/* <button onClick={() => deleteItem(item.ID)}>Delete</button> */}
                                    {/* <button onClick={() => setUpdatingId(item.ID)}>Update</button> */}
                                    <button onClick={() => setUpdatingId(item.ID)} class="btn btn-success btn-sm">Update</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {updatingId !== null && (
                <div>
                    <h1>Update Record</h1>
                    <form onSubmit={updateItem}>
                        <div>
                            <label htmlFor="Name">Name:</label>
                            <input
                                type="text"
                                id="Name"
                                name="Name"
                                value={updatedFormData.Name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="Notes">Notes:</label>
                            <textarea
                                id="Notes"
                                name="Notes"
                                value={updatedFormData.Notes}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="LAT">LAT:</label>
                            <input
                                type="number"
                                id="LAT"
                                name="LAT"
                                defaultValue={formData.LAT}
                                value={updatedFormData.LAT = formData.LAT}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="LNG">LNG:</label>
                            <input
                                type="number"
                                id="LNG"
                                name="LNG"
                                defaultValue={formData.LNG}
                                value={updatedFormData.LNG = formData.LNG}
                                onChange={handleChange}
                            />
                        </div>
                        <button class="btn btn-primary" type="submit">Update</button>
                        {/* <button type="submit"></button> */}
                    </form>
                </div>
            )}
        </div>
    );
};

export default Form;
