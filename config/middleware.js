module.exports.setflash = function(req,res,next){
	res.locals.flash={
		'sucess':req.flash('sucess'),
		'error':req.flash('sucess')
	}
	next();
}