let express = require('express'); //import Express framework and store in variable
let router = express.Router(); //stores the Express Router() method in a variable. Router() returns a router object.
let validateSession = require('../middleware/validate-session'); //import validate-session middleware and store in a variable
const Journal = require('../db').import('../models/journal');

router.get('/practice', validateSession, function (req, res) 
{
    res.send('This is practice!') 
})

router.post('/create', validateSession, function (req, res) {
    const journalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
        owner: req.user.id
    }
    Journal.create(journalEntry)
        .then(journal => res.status(200).json(journal))
        .catch(err => res.status(500).json({error:err}))
})

router.get("/", (req, res) => {
    Journal.findAll()
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err }))
});

router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Journal.findAll({
        where: { owner: userid}
    })
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err }))
});

router.get("/:title", (req, res) => {
    let title = req.params.title;
    Journal.findAll({
        where: { title: title}
    })
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/update/:entryId', validateSession, function (req, res) {
    const updateJournalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id } };

    Journal.update(updateJournalEntry, query)
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err }))
})

router.delete('/delete/:id', validateSession, function (req, res) {
    const query = {
        where: {
        id: req.params.id, owner: req.user.id 
    }
    };
    Journal.destroy(query)
    .then(journals => res.status(200).json({message: "Entry removed"}))
    .catch(err => res.status(500).json({ error: err }))
})
module.exports = router 