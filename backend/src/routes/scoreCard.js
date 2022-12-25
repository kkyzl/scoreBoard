import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
// RESTful APIs of ScoreCard
const router = Router();
const saveScore = async (name, subject, score) => {
  const existing = await ScoreCard.findOne({ name: name, subject: subject });
  var msg = "Adding";
  if (existing) {
    //update
    // ScoreCard.remove(existing);
    // .deleteOne(existing);
    const result = await ScoreCard.deleteOne(existing);
    msg = "Updating";

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
    console.log("Remove Score", existing);
    console.log("msg:", msg);
  }
  try {
    const newScore = new ScoreCard({
      name: name,
      subject: subject,
      score: score,
    });
    console.log("Created score", newScore);
    await newScore.save();
    console.log("test", { msg, newScore });
    return { msg, newScore };
  } catch (e) {
    throw new Error("Score creation error: " + e);
  }
};
const deleteDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    return "Database cleared";
  } catch (e) {
    throw new Error("Database deletion failed");
  }
};

const requestScore = async (type, filter) => {
  const data = {};
  data[type] = filter;
  //console.log(data);
  const existing = await ScoreCard.find(data);
  //console.log({ e, existing });
  try {
    //const existing = await ScoreCard.find(data);
    //console.log(typeof e);
    console.log("RETURN");
    return Array(existing);
  } catch (error) {
    console.log(error);
  }
};
// basic - 1 clear out DB (frontend/header.js)
router.delete("/cards", (_, res) => {
  try {
    (async () => {
      const message = await deleteDB();
      res.json({ message });
    })();
  } catch (e) {
    res.send("restFul error");
  }
});
// basic - 2 send data to DB (frontend/body.js)
router.post("/card", (req, res) => {
  try {
    //console.log("POST");
    console.log(req.body.name, req.body.subject, req.body.score);
    (async () => {
      const data = await saveScore(
        req.body.name,
        req.body.subject,
        req.body.score
      );
      // console.log("MSG:", data.msg);
      // console.log("DATA: ", data.newScore);
      // console.log("back to frontend");
      res.json({ message: data.msg, card: data.newScore });
    })();
  } catch (error) {
    res.status(503).send({ msg: "Server unable to start" });
  }
});
router.get("/cards", (req, res) => {
  try {
    const type = req.query.type;
    const filter = req.query.queryString;
    console.log("request query with", type, "be", filter);
    //const query = async () => await requestScore(type, filter);
    //console.log("QUERY: ", query);
    (async () => {
      const query = await requestScore(type, filter);
      console.log("QUERY", query);
      if (query[0].length === 0) {
        console.log("NO");
        res.json({
          message: `${req.query.type} (${req.query.queryString}) not found!`,
        });
      } else {
        res.json({ messages: query });
      }
    })();
    console.log("FINISH");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
export default router;
