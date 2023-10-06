import {gql, useMutation} from '@apollo/client'
import { GET_CONTACTS } from '../hooks/useContactList';

//use the mutation provided to delete contacts based on the id
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
            //re query for update
            refetchQueries: [{ query: GET_CONTACTS}],
        });
    };
    return { handleDelete };
}
