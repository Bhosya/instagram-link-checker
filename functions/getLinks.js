const fetch = require('node-fetch');

exports.handler = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/username/instagram-link-checker/main/links.json');
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Gagal mengambil data' })
    };
  }
};
