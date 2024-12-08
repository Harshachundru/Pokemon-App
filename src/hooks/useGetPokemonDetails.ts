import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      number
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetails = (name: string) => {
  return useQuery(GET_POKEMON, { variables: { name } });
};
