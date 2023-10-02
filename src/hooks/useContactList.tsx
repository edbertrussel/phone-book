import {useQuery, gql} from '@apollo/client'

export const GET_CONTACTS = gql`
query GetContactList (
  $distinct_on: [contact_select_column!], 
  $limit: Int, 
  $offset: Int, 
  $order_by: [contact_order_by!], 
  $where: contact_bool_exp
) {
contact(
    distinct_on: $distinct_on, 
    limit: $limit, 
    offset: $offset, 
    order_by: $order_by, 
    where: $where
){
  created_at
  first_name
  id
  last_name
  phones {
    number
  }
}
}
`

export const useContactList = () => {
    const {error, data, loading} = useQuery(GET_CONTACTS);

    return {
        error,
        data,
        loading,
    };
}