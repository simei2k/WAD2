import express from 'express'
import axios from 'axios'
import cors from 'cors'
const app = express();
const port = 3000;


app.use(cors());

app.get('/api/geocode', async (req, res) => {
  const { searchVal } = req.query;
  try {
    const response = await axios.get('https://onemap.gov.sg/api/common/elastic/search', {
      params: {
        searchVal,
        returnGeom: "Y",
        getAddrDetails: "Y"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching geolocation data');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
