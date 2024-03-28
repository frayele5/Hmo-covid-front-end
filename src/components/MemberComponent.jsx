import React, { useEffect, useState } from 'react'
import { createMember, getMember, updateMember } from '../services/MemberService';
import { useNavigate, useParams} from 'react-router-dom';

const MemberComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [identityCard, setIdentityCard] = useState('');
    const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [cellPhone, setCellPhone] = useState('');

    //Covid details
    const [vaccineDates, setVaccineDates] = useState(['', '', '', '']);
    const [vaccineManufacturers, setVaccineManufacturers] = useState(['', '', '', '']);
    const [positiveResultDate, setPositiveResultDate] = useState('');
    const [recoveryDate, setRecoveryDate] = useState('');
    
    const[errors, setErrors] = useState({
        firstName:'',
        lastName:'',
        identityCard:'',
        birthDate:'',
        phone:'',
        cellPhone:''
    })
    
    const {id} = useParams(); //Dynamically determine whether it is a creation or update
    const navigator = useNavigate();

    function pageTitle() {
        if(id) {
            return <h2 className='text-center'>Update member</h2>
        } else {
            return <h2 className='text-center'>Add member</h2>
        }
    }

    //When updating, the files are modified according to the member we want to update
    useEffect(() => {
        if(id) {
            getMember(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setIdentityCard(response.data.identityCard);
                setAddress(response.data.address);
                setBirthDate(formattedDate(response.data.birthDate));
                setPhone(response.data.phone);
                setCellPhone(response.data.cellPhone);
                setVaccineDates(formatDatesArray(response.data.covidInformation.vaccineDates));
                setVaccineManufacturers(response.data.covidInformation.vaccineManufacturers);
                setPositiveResultDate(formattedDate(response.data.covidInformation.positiveResultDate));
                setRecoveryDate(formattedDate(response.data.covidInformation.recoveryDate));
            }).catch(error => {console.error(error);})
        }
    }, [id])

    function saveOrUpdateMember(e) {
        e.preventDefault();
        const covidInfo = {
            vaccineDates: vaccineDates,
            vaccineManufacturers: vaccineManufacturers , 
            positiveResultDate: positiveResultDate, 
            recoveryDate: recoveryDate,
        };

        if(validationForm()) {
            const member = {firstName, lastName, identityCard, address, birthDate, phone, cellPhone, covidInformation: covidInfo};
            console.log(member);

            if(id) { // update member
                updateMember(id, member).then((response) => {
                    console.log(response.data);
                    navigator('/members')
                }).catch(error => {
                    console.error(error);
                })
            }
            else { // add member
                createMember(member).then((response) => {
                    console.log(response.data);
                    navigator('/members')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    // Validate the form when adding a new member 
    function validationForm() {
        let valid = true;
        const errorsCopy = {...errors}
        const nameRegex = /^[a-zA-Z]+$/; 
        const idRegex = /^\d{9}$/; 

        if(firstName.trim() && nameRegex.test(firstName)) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'Invalid first name';
            valid = false;
        }

        if(lastName.trim() && nameRegex.test(lastName)) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Invalid last name';
            valid = false;
        }

        if(idRegex.test(identityCard)) {
            errorsCopy.identityCard = '';
        } else {
            errorsCopy.identityCard = 'Invalid identity card (9 digits required)';
            valid = false;
        }

        if (positiveResultDate && recoveryDate) {
            if (new Date(recoveryDate) <= new Date(positiveResultDate)) {
                errorsCopy.recoveryDate = 'Recovery date must be after positive result date';
                valid = false;
            } else {
                errorsCopy.recoveryDate = '';
            }
        }

        setErrors(errorsCopy);
        return valid;
    }

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

    const handleDateChange = (index, event) => {
        const newDates = [...vaccineDates];
        newDates[index] = event.target.value;
        setVaccineDates(newDates);
    };

    const handleManufactureChange = (index, event) => {
        const newManufacturers = [...vaccineManufacturers];
        newManufacturers[index] = event.target.value;
        setVaccineManufacturers(newManufacturers);
    };
    
  return (
    <div className='container'>
        <br />
       <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input 
                                type = 'text' 
                                placeholder='enter member first name'
                                name = 'firstName'
                                value = {firstName}
                                className= {`form-control ${errors.firstName ? 'is-invalid':''}`}
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                            </input>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input 
                                type = 'text' 
                                placeholder='enter member last name'
                                name = 'lastName'
                                value = {lastName}
                                className= {`form-control ${errors.lastName ? 'is-invalid':''}`}
                                onChange={(e) => setLastName(e.target.value)}
                            >
                            </input>
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Identity Card:</label>
                            <input 
                                type = 'text' 
                                placeholder='enter id'
                                name = 'identityCard'
                                value = {identityCard}
                                className= {`form-control ${errors.identityCard ? 'is-invalid':''}`}
                                onChange={(e) => setIdentityCard(e.target.value)}
                            >
                            </input>
                            {<errors className="i"></errors> && <div className='invalid-feedback'>{errors.identityCard}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Address:</label>
                            <input 
                                type = 'text' 
                                placeholder='enter address'
                                name = 'address'
                                value = {address}
                                className='form-control'
                                onChange={(e) => setAddress(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Birth Date:</label>
                            <input 
                                type = 'date' 
                                placeholder='enter birth date'
                                name = 'birthDate'
                                value = {birthDate}
                                className='form-control'
                                onChange={(e) => setBirthDate(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Phone:</label>
                            <input 
                                type = 'text' 
                                placeholder='enter phone'
                                name = 'phone'
                                value = {phone}
                                className='form-control'
                                onChange={(e) => setPhone(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Cell Phone:</label>
                            <input 
                                type = 'text' 
                                placeholder='enter cellPhone'
                                name = 'cellPhone'
                                value = {cellPhone}
                                className='form-control'
                                onChange={(e) => setCellPhone(e.target.value)}
                            >
                            </input>
                        </div>
                        <br />
                        <h2>Covid Info</h2>
                        <br />
                        {vaccineDates.map((date, index) => (
                            <div key={index}>
                            <label className='form-label'>{`Vaccine Date ${index + 1}: `}</label>
                            <input
                                type="date"
                                id={`vaccineDate${index + 1}`}
                                value={date}
                                onChange={(e) => handleDateChange(index, e)}
                            />
                            </div>
                        ))}

                        {vaccineManufacturers.map((manufacture, index) => (
                            <div key={index}>
                            <label className='form-label'>{`Manufacture ${index + 1}: `}</label>
                            <input
                                type="text"
                                id={`manufacture${index + 1}`}
                                value={manufacture}
                                onChange={(e) => handleManufactureChange(index, e)}
                            />
                            </div>
                        ))}

                        <div className='form-group mb-2'>
                            <label className='form-label'>Positive Result Date:</label>
                            <input 
                                type = 'date' 
                                placeholder='enter positive Result Date'
                                name = 'positiveResultDate'
                                value = {positiveResultDate}
                                className='form-control'
                                onChange={(e) => setPositiveResultDate(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Recovery Date:</label>
                            <input 
                                type = 'date' 
                                placeholder='enter recovery date'
                                name = 'recoveryDate'
                                value = {recoveryDate}
                                className= {`form-control ${errors.recoveryDate ? 'is-invalid':''}`}
                                onChange={(e) => setRecoveryDate(e.target.value)}
                            >
                            </input>
                            {<errors className="i"></errors> && <div className='invalid-feedback'>{errors.recoveryDate}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateMember}>Submit</button>
                    </form>
                </div>
            </div>
       </div>
    </div>
  )
}

export default MemberComponent