import { gql, useMutation } from '@apollo/client';
import { GET_CONTACTS } from '../hooks/useContactList';

//use the mutation provided to edit and update the contact's first and last name
//having issues on edit and update for the phone numbers
const EDIT_CONTACT = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
      id
      first_name
      last_name
    }
  }
`;

interface ContactInput {
  id: number | undefined;
  _set: {
    first_name?: string;
    last_name?: string;
    //phones?: { number: string }[];
  };
}

export const useEditContact = () => {
  const [editContact] = useMutation(EDIT_CONTACT);

  const handleEditContact = (input: ContactInput) => {
    return editContact({
      variables: input,
      //re query for update
      refetchQueries: [{ query: GET_CONTACTS }],
    });
  };

  return { handleEditContact };
};
