
import React, { useState } from 'react';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { PokemonDetailDialog } from './PokemonDetailDialog';

// Importing the Pokemon type from the hook
import type { Pokemon as PokemonFromHook } from '../../hooks/useGetPokemons';

// Use the imported type
type Pokemon = PokemonFromHook;

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    marginRight: '20px',
    paddingTop: '0px',
    width: '100%',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '20px 0',
    backgroundColor: '#171E2b',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  searchInput: {
    width: '100%',
    maxWidth: '700px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: '#000',
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '16px',
    padding: '20px 15px',
  },
  listItem: {
    border: '2px solid #ccc',
    borderRadius: '20px',
    padding: '16px',
    textAlign: 'center',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      border: '4px solid #34aeeb',
      borderRadius: '20px',
      padding: '14px',
    },
  },
  image: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '20px',
  },
  types: {
    marginTop: '8px',
    fontSize: '0.8em',
    color: '#666',
  },
  name: {
    color: '#5790ab',
  },
});

export const PokemonList: React.FC = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const { pokemons, loading, error } = useGetPokemons();

  const [search, setSearch] = useState<string>('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleItemClick = (pokemonName: string) => {
    navigate(`/pokemon/${pokemonName}`);
  };

  // Filter Pokémon list based on the search input
  const filteredPokemons = pokemons.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={classes.container}>
      {/* Sticky Search Bar */}
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={classes.searchInput}
        />
      </div>

      {/* Pokémon List */}
      <div className={classes.list}>
        {filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className={classes.listItem}
            onClick={() => handleItemClick(pokemon.name)}
          >
            <img src={pokemon.image} alt={pokemon.name} className={classes.image} />
            <p className={classes.name}>{pokemon.name}</p>
            <p>Rank: #{String(pokemon.number)}</p> {/* Ensure number is treated as a string */}
            <p className={classes.types}>Type: {pokemon.types.join(', ')}</p>
          </div>
        ))}
      </div>

      {/* Dialog Component */}
      <PokemonDetailDialog />
    </div>
  );
};
