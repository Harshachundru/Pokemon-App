
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { createUseStyles } from 'react-jss';

// Define types for the pokemon data
interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: string[];
  weaknesses: string[];
  resistant: string[];
  image: string;
  maxCP: number;
  maxHP: number;
  fleeRate: number;
}

interface GetPokemonData {
  pokemon: Pokemon;
}

interface PokemonDetailDialogProps {}

const useStyles = createUseStyles({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '506px',
    padding: '10px',
    paddingTop: '35px',
    backgroundColor: '#171E2b',
    border: '4px solid #34aeeb',
  },
  cardTitle: {
    fontSize: '20px',
    marginBottom: '5px',
    color: '#5790ab',
    fontWeight: '500',

  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '10%',
    marginBottom: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    
  },
  cardContent: {
    backgroundColor: '#171E2b',
    paddingTop: '10px',
    paddingBottom: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '400px',
  },
  cardText: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#666',
  },
  closeButton: {
    marginBottom: '5px',
    border: '2px solid #007bff',
    borderColor: '#34aeeb',
    borderRadius: '20px',
    color: '#007bff',
    '&:hover': {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableHeader: {
    textAlign: 'left',
    padding: '8px',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '8px',
    textAlign: 'right',
  },
});

export const PokemonDetailDialog: React.FC<PokemonDetailDialogProps> = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useGetPokemonDetails(name!);

  const classes = useStyles();

  useEffect(() => {
    console.log('Pokemon data:', data);
  }, [data]);

  const handleClose = () => {
    navigate('/pokemon'); // Navigate back to the Pokémon list when closing the dialog
  };

  if (!name) return null;

  return (
    <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
      {loading ? (
        <DialogContent>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        </DialogContent>
      ) : error ? (
        <DialogContent>
          <p>Error: {error.message}</p>
        </DialogContent>
      ) : (
        <div>
          {/* Check if data.pokemon is defined */}
          {data?.pokemon ? (
            <>
              <DialogContent>
                <div className={classes.dialogContent}>
                  <img
                    src={data.pokemon.image}
                    alt={data.pokemon.name}
                    className={classes.image}
                  />
                  <DialogTitle className={classes.cardTitle}>{data.pokemon.name}</DialogTitle>
                  <div className={classes.cardContent}>
                    <table className={classes.table}>
                      <tbody>
                        <tr className={classes.tableRow}>
                          <td className={classes.tableHeader}><strong>Rank:</strong></td>
                          <td className={classes.tableCell}>#{data?.pokemon.number}</td>
                        </tr>
                        <tr className={classes.tableRow}>
                          <td className={classes.tableHeader}><strong>Height:</strong></td>
                          <td className={classes.tableCell}>
                            {data?.pokemon.height.minimum} - {data?.pokemon.height.maximum}
                          </td>
                        </tr>
                        <tr className={classes.tableRow}>
                          <td className={classes.tableHeader}><strong>Weight:</strong></td>
                          <td className={classes.tableCell}>
                            {data?.pokemon.weight.minimum} - {data?.pokemon.weight.maximum}
                          </td>
                        </tr>
                        <tr className={classes.tableRow}>
                          <td className={classes.tableHeader}><strong>Classification:</strong></td>
                          <td className={classes.tableCell}>{data?.pokemon.classification}</td>
                        </tr>
                        <tr className={classes.tableRow}>
                          <td className={classes.tableHeader}><strong>Types:</strong></td>
                          <td className={classes.tableCell}>{data?.pokemon.types.join(', ')}</td>
                        </tr>
                        <tr className={classes.tableRow}>
                          <td className={classes.tableHeader}><strong>Weaknesses:</strong></td>
                          <td className={classes.tableCell}>{data?.pokemon.weaknesses.join(', ')}</td>
                        </tr>
                        <tr className={classes.tableRow}>
                          <td className={classes.tableHeader}><strong>Resistant:</strong></td>
                          <td className={classes.tableCell}>{data?.pokemon.resistant.join(', ')}</td>
                        </tr>
                        <tr className={classes.tableRow}>
                          <td className={classes.tableHeader}><strong>Max CP:</strong></td>
                          <td className={classes.tableCell}>{data?.pokemon.maxCP}</td>
                        </tr>
                        <tr className={classes.tableRow}>
                          <td className={classes.tableHeader}><strong>Max HP:</strong></td>
                          <td className={classes.tableCell}>{data?.pokemon.maxHP}</td>
                        </tr>
                        <tr className={classes.tableRow}>
                          <td className={classes.tableHeader}><strong>Flee Rate:</strong></td>
                          <td className={classes.tableCell}>{data?.pokemon.fleeRate}</td>
                        </tr>
                      </tbody>
                    </table>
                   </div>
                </div>
              </DialogContent>
              <DialogActions>
                <button onClick={handleClose} color="primary" className={classes.closeButton}>
                  Close
                </button>
              </DialogActions>
            </>
          ) : (
            <DialogContent>
              <p>Pokemon not found.</p>
            </DialogContent>
          )}
        </div>
      )}
    </Dialog>
  );
};
