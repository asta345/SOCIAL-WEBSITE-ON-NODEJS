const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails',function(job,done){
	console.log('email workers is running',job.data);

	commentsMailer.newComment(job.data);
	done();
	console.log('work done');
})
