import axios from 'axios';

export default async function handler(req, res) {
  const { searchVal } = req.query;

  try {
    const response = await axios.get('https://onemap.gov.sg/api/common/elastic/search', {
      params: {
        searchVal,
        returnGeom: "Y",
        getAddrDetails: "Y"
      }
    });

    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow CORS
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching geolocation data');
  }
}
