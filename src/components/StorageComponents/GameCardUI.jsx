import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ButtonAction = styled(Button)(() => ({
  color: 'white',
  fontFamily: '"Chakra Petch", sans-serif',
  borderRadius: 0,
}));

function GameCardUI({ game }) {
  return (
    <CardMedia
      square
      sx={{ maxWidth: 345, color: '#FFF', backgroundColor: '#000' }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={game.background_image}
        title={game.name}
        loading="lazy"
      />
      <CardContent>
        <p className="font-main fw-bold">{game.name}</p>
        <p className="small text-secondary font-main">
          {game.genres.map((el) => el.name).join(', ')}
        </p>
      </CardContent>
      <CardActions>
        <ButtonAction variant="outlined" size="small">
          Visita gioco
        </ButtonAction>
      </CardActions>
    </CardMedia>
  );
}

export default GameCardUI;
