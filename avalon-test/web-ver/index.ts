import * as express from "express";
const app = new express();

app.get('/', (req, res)=>{
    res.send('listening to port 3000');
});
app.listen(3000, () => {
  console.log("listening to port 3000");
});
