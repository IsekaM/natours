// Requires
const express = require('express');
const fs = require('fs');

// Helper Functions
const app = express();
const log = console.log;

// Just Some Vars
const port = process.env.PORT || 3000;
const tourData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// Server Controllers
const logServerStartUp = () => log('Server started...');

const homeController = {
  index(req, res) {
    res.status(200).json({
      name: 'Makesi',
      bleh: 'Lorem Ipsum'
    });
  }
};

// Controllers
const tourAPI = {
  getAll(req, res) {
    res.status(200).json({
      status: 200,
      data: {
        tours: tourData
      }
    });
  },

  getID(req, res) {
    const id = parseInt(req.params.id);
    const tour = tourData.find(item => item.id === id);
    if (tour) {
      res.status(200).json({
        status: 200,
        data: {
          tour: tour
        }
      });
      return;
    }

    res.status(404).send('Tour');
  },

  post(req, res) {
    const newID = tourData.length;
    const newTour = Object.assign({ id: newID }, req.body);
    tourData.push(newTour);
    const parsedData = JSON.stringify(tourData);

    fs.writeFile('./dev-data/data/tours-simple.json', parsedData, err => {
      if (err) {
        res.send('Error while writing file to database.');
        throw err;
      } else {
        log(req.body, newID);
        res.status(201);
        res.send('Sent to database sucessfully.');
      }
    });
  },

  patch(req, res) {
    const id = parseInt(req.params.id);
    const body = req.body;
    const tour = tourData.find(item => item.id === id);

    if (!tour) {
      res.status(404);
      res.send('File does not exist in database.');
      return;
    }

    for (const key in body) {
      tourData
        .filter(item => item.id === id)
        .map(item => (item[key] = body[key]));
    }

    fs.writeFile(
      './dev-data/data/tours-simple.json',
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
  },

  delete(req, res) {
    const id = parseInt(req.params.id);
    const tourIndex = tourData.findIndex(item => item.id === id);

    if (tourIndex < 0) {
      res.send('Unable to find tour.');
      return;
    }

    tourData.splice(tourIndex, 1);
    fs.writeFile(
      './dev-data/data/tours-simple.json',
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
  }
};

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

// Routes
app
  .route('/api/v1/tours')
  .get(tourAPI.getAll)
  .post(tourAPI.post);

app
  .route('/api/v1/tours/:id')
  .get(tourAPI.getID)
  .patch(tourAPI.patch)
  .delete(tourAPI.delete);

// Exposing server to the world
app.listen(port, logServerStartUp);
