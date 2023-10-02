import {gql, useMutation} from '@apollo/client'
import { GET_CONTACTS } from '../hooks/useContactList';

const DELETE_CONTACTINFO = gql`
mutation DeleteContactInfo($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }  
`
export const useDeleteContact  = () => {
    const [deleteContact] = useMutation(DELETE_CONTACTINFO);

    const handleDelete = (id: number | undefined) => {
        
        return deleteContact({
            variables: {id},
            refetchQueries: [{ query: GET_CONTACTS}],
        });
    };
    return { handleDelete };
}
