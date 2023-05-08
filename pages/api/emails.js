export default async function handler(req, res) {
  let returnTo =
    req.headers.referrer ||
    req.headers.referer ||
    'https://www.sanctuary.computer';

  if (req.body.email) {
    await fetch('https://hooks.zapier.com/hooks/catch/8820587/3uhhepf/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: req.body.email,
        referer: returnTo,
      }),
    });

    await fetch('https://garden3d.substack.com/api/v1/free', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: req.body.email,
      }),
    });
  }

  res.status(200).json({ status: 'ok' });
}
