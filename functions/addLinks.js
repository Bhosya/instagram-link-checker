const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');

exports.handler = async (event) => {
  const { link } = JSON.parse(event.body);

  try {
    // Ambil data links.json dari GitHub
    const response = await fetch('https://raw.githubusercontent.com/bhosya/instagram-link-checker/main/links.json');
    const data = await response.json();

    // Cek apakah link sudah ada
    if (data.links.includes(link)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Link sudah digunakan' })
      };
    }

    // Tambahkan link baru
    data.links.push(link);

    // Update file di GitHub
    const octokit = new Octokit({
      auth: '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', // Ganti dengan token GitHub kamu
    });

    await octokit.repos.createOrUpdateFileContents({
      owner: 'bhosya', // Ganti dengan username GitHub kamu
      repo: 'instagram-link-checker',
      path: 'links.json',
      message: 'Add new link',
      content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
      sha: 'SHA_OF_THE_FILE' // Ganti dengan SHA dari file JSON, bisa didapat dari GitHub API
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Link berhasil ditambahkan' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Gagal menambahkan link' })
    };
  }
};
