import {useQuery, gql} from '@apollo/client'

const GET_CONTACTINFO = gql`
query GetContactInfo($id: Int!){
    contact_by_pk(id: $id) {
    last_name
    id
    first_name
    created_at
    phones {
      number
    }
  }
}
`

export const useContactInfo = (id: number | undefined) => {
    const { data, error, loading } = useQuery(GET_CONTACTINFO, {
        variables: {
            id
        }
    });
    return {
        error, data, loading,
    };
}