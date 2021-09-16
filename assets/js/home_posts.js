//method to submit  the form for new post using ajax
{
let createPost = function(){
	let newPostForm =$('#new-post-form');
	 
	newPostForm.submit(function(e){
		e.preventDefault();

		$.ajax({
			type:'post',
			url:'/posts/create',
			data:newPostForm.serialize(),
			success:function(data){
                        console.log(data);
			},error:function(error){
                        console.log(error.responseText);
			}
		})
	})
}
    createPost();


 // method to create a post in dom


























}
