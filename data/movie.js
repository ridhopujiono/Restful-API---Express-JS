const express = require('express');
const router = express.Router();
const movies = [
    {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
    {id: 102, name: "Inception", year: 2010, rating: 8.7},
    {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
    {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
];

function existsId(id) {
    let check =movies.some(function (movie) {
        return movie.id === id;
    });

    return check;
}

// GET METHOD
router.get('/', function (req, res) {
    res.json(movies);
})

// GET SPECIFIC ID
router.get('/:id', function (req, res) {
    const id = req.params.id;
    const movie = movies.find(movie => movie.id == id);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({message: 'Movie not found'});
    }
});

// POST METHOD
router.post('/', function (req, res){
    let {name, year, rating} = req.body;
    if(!name  || !year.toString().match(/^[0-9]{4}$/g)) {
        res.status(400).json({message: 'Baq Request'});
    }
    let newID = movies[movies.length - 1].id + 1;
    movies.push({id: newID, name: name, rating: rating})
    res.json({
       message: 'Movie added',
       data: movies[movies.length-1]
    });

})

// PUT METHOD UPDATE OR CREATE
router.put('/:id', function (req, res) {
    let {name, year, rating} = req.body;
    let id = req.params.id;
    id = parseInt(id);
   
    const checkId = existsId(id);

    if(!name  || !year.toString().match(/^[0-9]{4}$/g)) {
        res.status(400).json({message: 'Baq Request'});
    }

    if(!checkId) {
        movies.push({id: id, name: name, rating: rating});
        res.status(201).json({message: 'Created successfully'});
    }else{
        let getIndex = movies.findIndex(function(row){
            return row.id === id;
        });
        
        movies[getIndex] = {
            id: id,
            name: name,
            rating: rating
        }
        res.status(201).json({message: 'Updated successfully'});
    }
});

// DELETE METHOD
router.delete('/:id', function (req, res) {
    let id = req.params.id;
    id = parseInt(id);
   
    const checkId = existsId(id);

    if(!checkId) {
        res.status(401).json({message: 'Cannot Find ID'});
    }else{
        let getIndex = movies.findIndex(function(row){
            return row.id === id;
        });
        movies.splice(getIndex, 1);
        res.status(201).json({message: 'Deleted successfully', data: movies});
    }
});

// Export the router
module.exports = router;