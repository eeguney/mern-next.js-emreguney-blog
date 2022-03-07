import dbConnect from "../../../../utils/mongo";
import BlogPost from "../../../../models/BlogPost";
import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'HEAD'],
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  const {
    method,
    query: { prev },
  } = req;

  dbConnect();

  if (method === "GET") {
    await runMiddleware(req, res, cors)
    try {
      const prevPost = await BlogPost.find({ _id: { $lt: prev } })
        .sort({ _id: -1 })
        .limit(1);
      if (prevPost) {
        return res.status(200).json(prevPost);
      } else {
        return res.status(400).json("This doesnt exist!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
