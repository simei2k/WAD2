import axios from 'axios';

export default async function handler(req, res) {
  const { searchVal } = req.query;

  if (!searchVal) {
    return res.status(400).json({ error: 'Missing searchVal parameter' });
  }

  try {
    const response = await axios.get('https://onemap.gov.sg/api/common/elastic/search', {
      params: {
        searchVal,
        returnGeom: "Y",
        getAddrDetails: "Y"
      }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return res.status(500).json({ error: 'Failed to fetch geolocation data' });
  }
}
