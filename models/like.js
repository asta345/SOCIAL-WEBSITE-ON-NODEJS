const mongoose = require('moongoose');

const likeSchema = new mongoose.Schema({
	user:{
		type:mongoose.Schema.objectId
	},
	//this is defines the object id of the like object
        likeable:{
		type:mongoose.Schema.objectId,
		require:true,
		// ref path used to decide which other property 
	        refPath:onModel
	},
	// this feild is used to define the type of the liked object this is a dynamic refernce
	onModel:{
		type:String,
		required:true,
		enum:['post','comment']

	}
},{
	timestamps:true
})

const Like = mongoose.model('like',likeSchema)
module.exports = Like;