const router = require('express').Router();
let Document = require('../models/document.model');

router.route('/').get((req, res) => {
    Document.find()
        .limit(10)
        .then(documents => res.json(documents))
        .catch(e => res.status(400).json('Error: ' + e));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const userEmail = req.body.userEmail;
    const content = req.body.content;
    const newDocument = new Document({title, userEmail, content});

    newDocument.save()
        .then( () => res.json('Document created!'))
        .catch( err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Document.findById(req.params.id)
        .then(document => res.json(document))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Document.findById(req.params.id)
        .then(document => {
            document.title = req.body.title;
            document.content = req.body.content;
            document.save()
                .then( () => res.json('Document updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Document.findByIdAndDelete(req.params.id)
        .then(() => res.json('Excercise Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/findByEmail/:userEmail').get((req, res) => {
    Document.find({userEmail: req.params.userEmail})
        .then(document => res.json(document))
        .catch(err => res.status(200).json('Error: ' + err));
});

module.exports = router;