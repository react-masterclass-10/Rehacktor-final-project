/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const Input = styled('input')(() => ({
  width: '100%',
  height: '55px',
  backgroundColor: 'transparent',
  borderRadius: 0,
  border: '1px solid black',
  fontFamily: '"Chakra Petch", sans-serif',
  fontSize: '18px',
  padding: '20px 10px',
  '& li.Mui-focused': {
    borderColor: '#000',
    color: 'black',
    cursor: 'pointer',
  },
}));

const Listbox = styled('ul')(() => ({
  width: '50%',
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: '#000',
  color: 'white',
  overflow: 'auto',
  maxHeight: 500,
  '& li.Mui-focused': {
    color: 'gray',
    cursor: 'poin ter',
  },
  '& li:active': {
    backgroundColor: '#000',
    color: 'white',
  },
}));

function AutocompleteSearch() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.currentTarget.value);
  };

  // DEBOUNCING SENZA CUSTOM HOOK
  useEffect(() => {
    setGames([]);
    const timeoutAPI = setTimeout(() => {
      if (!search) return;
      setLoading(true);
      async function fetchSearchedGame() {
        console.log('calling API', search);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&search=${search}`
          );
          if (response.ok) {
            const json = await response.json();
            setGames(json.results);
          } else {
            console.log('Ops, Riprova la tua API...');
          }
        } catch (e) {
          console.log(e.message);
        }
        setLoading(false);
      }
      fetchSearchedGame();
    }, 1200);
    // clean up dell evento precedente...
    return () => {
      clearTimeout(timeoutAPI);
    };
  }, [search]);

  const { getInputProps, getListboxProps, getOptionProps, groupedOptions } =
    useAutocomplete({
      id: 'use-autocomplete',
      options: games,
      getOptionLabel: (option) => option.name,
    });
  return (
    <div>
      <div>
        <Input
          {...getInputProps()}
          placeholder="Inserisci qui il gioco da cercare..."
          onChange={handleSearch}
          value={search}
        />
        {loading && (
          <Listbox>
            <Box sx={{ display: 'flex', padding: '30px 30px' }}>
              <CircularProgress color="inherit" />
            </Box>
          </Listbox>
        )}
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li
                className="p-3 font-main d-flex align-items-center"
                style={{
                  cursor: 'pointer',
                }}
                key={option.id}
                {...getOptionProps({ option, index })}
              >
                <Avatar
                  alt={`${option.name}`}
                  src={`${option.background_image}`}
                  sx={{ marginRight: '10px' }}
                />
                <Link
                  className="text-decoration-none text-reset"
                  to={`/game/${option.slug}/${option.id}`}
                >
                  {option.name}
                </Link>
              </li>
            ))}
          </Listbox>
        ) : null}
      </div>
    </div>
  );
}

export default AutocompleteSearch;
