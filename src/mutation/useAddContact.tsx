import {gql, useMutation} from '@apollo/client'
import { GET_CONTACTS } from '../hooks/useContactList';

const ADD_CONTACTINFO = gql`
mutation AddContactWithPhones(
    $first_name: String!, 
    $last_name: String!, 
    $phones: [phone_insert_input!]!
    ) {
  insert_contact(
      objects: {
          first_name: $first_name, 
          last_name: 
          $last_name, phones: { 
              data: $phones
            }
        }
    ) {
    returning {
      first_name
      last_name
      id
      phones {
        number
      }
    }
  }
}
`
export const useAddContact  = () => {
    const [addContact] = useMutation(ADD_CONTACTINFO);

    const handleAddContact = (firstName: string, lastName: string, phones: Array<{number: string}>) => {
        return addContact({
          variables: { first_name: firstName, last_name: lastName, phones },
          refetchQueries: [{ query: GET_CONTACTS}],
        });
      };

      return { handleAddContact };

}