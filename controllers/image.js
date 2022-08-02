const { response } = require("express");

const handleApiCall = (req, res) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: "qbjh6bpxf4zy",
      app_id: "1",
    },
    inputs: [
      {
        data: {
          image: {
            url: req.body.input,
          },
        },
      },
    ],
  });

  return fetch(
    "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key 98b0b1dc315a482c8f6b96bfe2dcea51",
      },
      body: raw,
    }
  )
    .then((response) => response.text())
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log("error", error));
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Unable to get entries"));
};
module.exports = { handleImage, handleApiCall };
