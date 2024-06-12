import { useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';

function Game() {
  const game = useLoaderData();
  console.log(game);

  const data = game.ratings.map((rate) => {
    return {
      label: rate.title,
      value: rate.count,
    };
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="container-fluid">
        <div className="container py-5">
          <div className="row py-5">
            <div className="col-12 col-md-6 my-5">
              <h2 className="display-3 fw-bold">{game.name}</h2>
              <p className="fw-bold lead font-main text-secondary">
                About this game
              </p>
              <p className="small">{game.description_raw}</p>
              <p className="lead font-main fw-bold text-secondary">
                Rating attuale
              </p>
              <div className="w-75">
                <Stack direction="row">
                  <PieChart
                    colors={['#02B2AF', '#B800D8', 'orange', 'blue']}
                    series={[
                      {
                        data,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 1,
                        cornerRadius: 10,
                        startAngle: -135,
                        endAngle: 180,
                        cx: 100,
                        cy: 100,
                      },
                    ]}
                    margin={{ right: 5 }}
                    width={400}
                    height={250}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' },
                        padding: 0,
                        itemMarkWidth: 10,
                        itemMarkHeight: 8,
                        markGap: 10,
                        itemGap: 20,
                        labelStyle: {
                          fontSize: 18,
                          fill: 'black',
                          fontFamily: '"Chakra Petch", sans-serif',
                          // fontWeight: 'bold',
                        },
                      },
                    }}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const getGameDetails = async ({ params }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}games/${params.id}?key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const json = response.json();
  return json;
};

export default Game;
