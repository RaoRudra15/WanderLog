import mongoose from "mongoose";

const travelStorySchema=new mongoose.Schema({
    title:{type:String, required:true},
    story:{type:String, required:true},
    visitedLocation:{type:[String], default:[]},
    isFavourite:{type:Boolean, default:false},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    createdOn:{type:Date,default:Date.now},
    imageUrl:{type:String, required:true},
    visitedDate:{type:Date, required:true}
})

export const TravelStory=mongoose.model("TravelStory",travelStorySchema);