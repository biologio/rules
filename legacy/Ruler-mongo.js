/**
 * Created by dd on 12/12/15.
 */
biolog.Ruler.testMongoQuery = function(query, collection) {
    console.log("testMongoQuery: ", query);
    console.time("testMongoQuery");

    var result = collection.find(query).fetch();

    console.time("testMongoQuery");
    return result;
};
