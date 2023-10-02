import React from 'react'
import { useContactInfo } from '../hooks/useContactInfo'
import { useParams } from 'react-router-dom';

export default function ContactInfoPage() {

  const {id} = useParams();

  const idAsNumber = id ? parseInt(id, 10) : undefined;

  const {data, loading, error} = useContactInfo(idAsNumber);

  return (    
    <div>
      <h1>{data?.contact_by_pk.first_name}</h1>
      <h1>{data?.contact_by_pk.last_name}</h1>

       <ul>
        {data?.contact_by_pk.phones.map((phone: { number: string}, phoneIndex: React.Key) => (
        <li key={phoneIndex}>{phone.number}</li>
        ))}
        </ul> 

    </div> 
  )
}
