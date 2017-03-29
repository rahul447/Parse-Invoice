import express from "express";
import fileOps from "../services/fileOps";
let router = express.Router();

module.exports = (config, destFolder) => {

	router.get('/', (req, res) => {
		res.render('index', { title: 'Parse Invoice' });
	});

  router.post('/upload', function(req, res) {
    res.redirect('/read?filename=' + req.file.filename);
  });

  router.get('/read', (req, res) => {
    fileOps.getLines(destFolder + req.query.filename, 4, function(err, linesArr) {

      fileOps.operate(linesArr).then(data => {
        fileOps.writeStream(data, destFolder + config.outFile)
				.then(w => {
					res.send(w);
				}).catch(err => {
          res.render('error', { error: err });
				});
			}).catch(err =>{
        res.render('error', { error: err });
			});
    });
  });

	return router;
};
