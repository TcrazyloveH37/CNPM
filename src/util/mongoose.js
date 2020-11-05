module.exports = {
    multipleMongooseToObject: function(mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function(mogoose){
        return mogoose ? mogoose.toObject() : mogoose;
    }
};