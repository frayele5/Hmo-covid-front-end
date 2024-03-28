import React, { useEffect, useState } from 'react'
import { getMember } from '../services/MemberService';
import { useParams } from 'react-router-dom';

const ShowDetailsComponent = () => {
    const [member, setMember] = useState([]);
    const {id} = useParams();

        useEffect(() => {
            if (id) { 
                getMember(id)
                    .then((response) => {
                        setMember(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching member details:', error);
                    });
            }
        }, [id])
        
        function formattedDate(inputDate) {
            if (inputDate === null) {
                return '';
            }
            else {
                const parsedDate = new Date(inputDate);
                const formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
                return formattedDate;
            }
        }

        function formatDatesArray(dates) {
            return dates.map(date => {
                if (date === null) {
                    return '';
                } else {
                    const parsedDate = new Date(date);
                    return `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
                }
            });
        }
        
        return (
            <div>
                {member ? (
                    <div>
                        <h2>Member Details</h2>
                        <br />
                        <div>
                            <p><strong>First Name:</strong> {member.firstName}</p>
                            <p><strong>Last Name:</strong> {member.lastName}</p>
                            <p><strong>ID:</strong> {member.identityCard}</p>
                            <p><strong>Address:</strong> {member.address}</p>
                            <p><strong>Birth Date:</strong> {formattedDate(member.birthDate)}</p>
                            <p><strong>Phone:</strong> {member.phone}</p>
                            <p><strong>Cell Phone:</strong> {member.cellPhone}</p>
                            {member.covidInformation && (
                            <div>
                                <p><strong>Vaccine Dates:</strong> {formatDatesArray(member.covidInformation.vaccineDates).map(date => date ? date : '').join(', ')}</p>
                                {member.covidInformation.positiveResultDate && (
                                <p><strong>Positive Result Date:</strong> {formattedDate(member.covidInformation.positiveResultDate)}</p>
                                )}
                                {member.covidInformation.recoveryDate && (
                                <p><strong>Recovery Date:</strong> {formattedDate(member.covidInformation.recoveryDate)}</p>
                                )}
                                
                            </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
}

export default ShowDetailsComponent