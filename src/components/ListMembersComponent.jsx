import React, { useEffect, useState } from 'react'
import { deleteMember, listMembers } from '../services/MemberService';
import { useNavigate } from 'react-router-dom';

const ListMembersComponent = () => {

    const [members, setMembers] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllMembers();
    }, [])

    function getAllMembers() {
        listMembers().then((response) => {
            setMembers(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    function addNewMember() {
        navigator('/add-members')
    }

    function handleUpdate(id) {
        navigator(`/update-member/${id}`)
    }

    function handleShowDelete(id) {
        navigator(`/show-details-member/${id}`)
    }

    function handleDelete(id) {
        deleteMember(id).then((response) => {
            getAllMembers();
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div>
            <h2 className='text-center'>List of members</h2>
            <div className="container">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Identity Card</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.identityCard}>
                                <td>{member.firstName}</td>
                                <td>{member.lastName}</td>
                                <td>{member.identityCard}</td>
                                <td >
                                    <button className="btn btn-info" onClick={() => handleShowDelete(member.identityCard)}>Show Details</button>
                                    <button className="btn btn-info" onClick={() => handleUpdate(member.identityCard)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(member.identityCard)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-primary" onClick={addNewMember}>add member</button>
        </div>
    )
}

export default ListMembersComponent