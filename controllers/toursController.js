// Including module
const fs = require('fs');
const log = console

// Reading JSON file/database
const tourData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

// Defining/declaring tours controller object
const toursController = { api: {} };

toursController.api.getAll = (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      tours: tourData
    }
  });
};

toursController.api.getID = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tourData.find(item => item.id === id);
  res.status(200).json({
    status: 200,
    data: {
      tour: tour
    }
  });
};

toursController.api.post = (req, res) => {
  const newID = tourData.length;
  const newTour = Object.assign({ id: newID }, req.body);
  tourData.push(newTour);
  const parsedData = JSON.stringify(tourData);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    parsedData,
    err => {
      if (err) {
        res.send('Error while writing file to database.');
        throw err;
      } else {
        log(req.body, newID);
        res.status(201);
        res.send('Sent to database sucessfully.');
      }
    }
  );
};

toursController.api.patch = (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const tour = tourData.find(item => item.id === id);

  for (const key in body) {
    tourData
      .filter(item => item.id === id)
      .map(item => (item[key] = body[key]));
  }

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tourData),
    err => {
      if (err) {
        res.send('Error writing file to database.');
        return;
      }

      res.status(204);
      res.json({
        status: 204,
        data: {
          tour: tour
        }
      });
    }
  );
};

toursController.api.delete = (req, res) => {
  const id = parseInt(req.params.id);
  const tourIndex = tourData.findIndex(item => item.id === id);

  tourData.splice(tourIndex, 1);
  fs.writeFile(
    `${__dirname}../dev-data/data/tours-simple.json`,
    JSON.stringify(tourData),
    err => {
      if (err) {
        res.status(404);
        res.send('Error writing changes to database');
        throw err;
      }
      res.status(204);
      res.send('Data successfully deleted');
    }
  );
};

toursController.api.checkID = (req, res, next, val) => {
  const value = parseInt(val);
  if (value > tourData.length || value < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  next();
};

toursController.api.checkBody = (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.price) {
    return res.status(400).json({
      status: 'bad request',
      message: 'Please provide name and price'
    });
  }

  next();
};

module.exports = toursController;
