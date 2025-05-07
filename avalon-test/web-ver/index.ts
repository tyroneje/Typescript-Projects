import express from "express";
const app = express();

app.get("/", (req: any, res: any) => {
  res.send("listening to port 3000");
});

app.get("/movies", async (req: any, res: any) => {
  let resposne = await fetch(
    `https://www.movies.com/movies?title=${req.params["title"]}`
  );
 // console.log(await resposne.text());
  res.send(await resposne.text());
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
