const express = require('express')
const cors = require('cors')
const ctrl = require('./controller')
const app = express()

app.use(express.json()); 
app.use(cors());

// endpoints
app.get('/api/trending', ctrl.getTrending);
app.get('/api/true-crime', ctrl.getTrueCrime);
app.get('/api/comedy', ctrl.getComedy);
app.post('/api/search', ctrl.searchPods);
app.get('/api/category/:id', ctrl.getCategory);
app.get('/api/get-details/:id', ctrl.getDetails);
app.post('/api/add-fix-list', ctrl.addToFixList);
app.get('/api/get-fix-list', ctrl.getFixList);
app.post('/api/get-recommendations', ctrl.getRecs);



app.listen(4000, ()=> {
    console.log('Listening on 4000')
})