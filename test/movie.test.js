const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const server=require("../app")

chai.use(chaiHttp)
let movieId

describe("get movie",()=>{
    it('get api movies ',  (done) => {
        chai.request(server)
            .get("/api/movies")
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("array")
                done()




            })
    });

})
describe("post movie",()=>{
    it('should post a movie', function (done) {
        const movie = {
            title:"Udemy",
            director_id:"62e6cdca9664d1062a27ca18",
            category:"comedy",
            country:"türkiye",
            year:1980,
            imdb_score:8
        }
        chai.request(server)
            .post("/api/movies")
            .send(movie)
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("title")
                res.body.should.have.property("director_id")
                res.body.should.have.property("category")
                res.body.should.have.property("country")
                res.body.should.have.property("year")
                res.body.should.have.property("imdb_score")
                movieId=res.body._id
                done()
            })
    });
})
describe("get director_id movie",()=>{
    it('should a movie bt the gicen id', function (done) {
        chai.request(server)
            .get("/api/movies/"+movieId)
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.have.a("object")
                res.body.should.have.property("title")
                res.body.should.have.property("director_id")
                res.body.should.have.property("category")
                res.body.should.have.property("country")
                res.body.should.have.property("year")
                res.body.should.have.property("imdb_score")
                res.body.should.have.property("_id").eql(movieId)
                done()
            })
    });
})