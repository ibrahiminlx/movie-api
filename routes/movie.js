const express = require('express');
const router = express.Router();


//models
const Movie = require("../models/Movie")


router.get("/",(req,res)=>{
    Movie.aggregate([
        {
            $lookup:{
                from: "directors",
                localField: "director_id",
                foreignField: "_id",
                as: "director"
            }
        },
        {
            $unwind: "$director"
        }
    ])
        .then((data)=>{
            res.json(data)
    })
        .catch((err)=>{
            res.json(err)
    })
})
router.get("/top10",(req,res)=>{
    Movie.find({}).limit(10).sort({imdb_score:-1})
        .then((data)=>{
        res.json(data)
    })
        .catch((err)=>{
            res.json(err)
        })
})

router.get("/:movie_id",(req,res,next)=>{
    Movie.findById(req.params.movie_id)
        .then((movie)=>{
            if(!movie)
                next({message:"Böyle bir film Bulunamadi",code:1})
            res.json(movie)
        })
        .catch((err)=>{
            res.json(err)
        })
})
router.put("/:movie_id",(req,res,next)=>{
    Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true})
        .then((movie)=>{
            if(!movie)
                next({message:"Böyle bir film yok",code:2})
            res.json(movie)
        }).catch((err)=>{
            res.json(err)
    })
})
router.delete("/:movie_id",(req,res,next)=>{
    Movie.findByIdAndRemove(req.params.movie_id)
        .then((movie)=>{
            if(!movie)
                next({message:"Böyle bir film Bulunamadi ve silinemedi",code:3})
            res.json({status : 1})
        })
        .catch((err)=>{
            res.json(err)
        })
})


router.post('/', (req, res, next)=> {
    // const { title,imdb_score,category,country,year } = req.body
    const movie = new Movie(req.body)
    // movie.save((err,data)=>{
    //     if (err)
    //         res.json(err)
    //     res.json()
    // })

    movie.save().then((data)=>{
        res.json(data)
    })
        .catch((err)=>{
            res.json(err)
        })
});
//between
router.get("/between/:start_year/:end_year",(req,res)=>{
    const {start_year,end_year} = req.params
    Movie.find({
        year:{
            "$gte": Number(start_year),"$lte":Number(end_year)
        }
    })
        .then((data)=>{
        res.json(data)
    })
        .catch((err)=>{
            res.json(err)
        })
})


module.exports = router;
