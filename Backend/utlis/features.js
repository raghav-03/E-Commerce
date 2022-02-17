class Fetures{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }
    search(){
        // make a new object for regular expression and make it case insensitive
        const keyword=this.querystr.keyword?{
            name:{
                $regex:this.querystr.keyword,
                $options:"i"
            }
        }:{}
        // update our query
        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){
        // make a copy for query string so that if we make changes then the orignal string doesnt get affected
        let querycopy={...this.querystr};
        // make a array to remove all this fields from querycopy
        let queryfilter=["keyword","page"];
        // using for each remove all extra query
        queryfilter.forEach(key=>delete querycopy[key]);
        // update our query convert into string then add $ as in mongo each operation is performed with $ symbols
        let querystr=JSON.stringify(querycopy);
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        this.query=this.query.find(JSON.parse(querystr));
        return this;
    }
    pagination(perpageitem){
        // finding the value of page
        let resultpage=Number(this.querystr.page) ||1;
        // calculating how many result is to be skipped
        let skip=perpageitem*(resultpage-1);
        this.query=this.query.limit(perpageitem).skip(skip);
        return this;
    }
}

module.exports= Fetures;