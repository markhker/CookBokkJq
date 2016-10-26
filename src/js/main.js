
$(function() {
  $('.image-editor').cropit({
    exportZoom: 1.25,
    imageState: {
      src: 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-524253160393/images/create/waiter.png',
    },
  });
  
  $('#rotate2').click(function() {
    $('.image-editor').cropit('rotateCW');
  });
  
  $('#rotate1').click(function() {
    $('.image-editor').cropit('rotateCCW');
  });
  
  $('#uploadMain').click(function() {
    var imageData = $('.image-editor').cropit('export');
    window.open(imageData);
  });
  
  $('#plusOne').click(function() {
    $('#fileUploadMain').click();
  });
  
  $('.image-user').cropit({
    exportZoom: 1.25,
    imageState: {
      src: 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-524253160393/images/create/user.png',
    },
  });
  
  $('#rotate4').click(function() {
    $('.image-user').cropit('rotateCW');
  });
  
  $('#rotate3').click(function() {
    $('.image-user').cropit('rotateCCW');
  });
  
  $('#uploadUser').click(function() {
    var imageData = $('.image-user').cropit('export');
    window.open(imageData);
  });
  
  $('#plusUser').click(function() {
    $('#fileUploadUser').click();
  });
  
});