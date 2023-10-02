import {gql, useMutation} from '@apollo/client'
import { GET_CONTACTS } from '../hooks/useContactList';

const ADD_PHONE = gql`
mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number:String!) {
    update_phone_by_pk(pk_columns: $pk_columns, _set: {number: $new_phone_number}) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`
export const useEditPhone = () => {
    const [addPhoneMutation] = useMutation(ADD_PHONE);
  
    const addOrUpdatePhone = async (id: number | undefined, newPhoneNumber: string) => {
      try {
        const result = await addPhoneMutation({
          variables: {
            pk_columns: { id: id }, // Replace 'id' with the actual primary key field
            new_phone_number: newPhoneNumber,
          },
          refetchQueries: [{ query: GET_CONTACTS }],
        });
  
        if (result.data && result.data.update_phone_by_pk) {
          // Handle success
          return result.data.update_phone_by_pk.contact;
        } else {
          // Handle failure
          throw new Error('Failed to update or add phone number.');
        }
      } catch (error) {
        console.error('An error occurred while updating or adding a phone number:', error);
        throw error;
      }
    };
  
    return { addOrUpdatePhone };
  };
