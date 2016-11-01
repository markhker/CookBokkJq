$(function() {

  var imageDishData, imageUserData;

  $('.image-editor').cropit({
    exportZoom: 2,
    imageState: {
      src: 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-524253160393/images/create/waiter.png',
    },
    type: 'image/jpeg',
    quality: .9
  });

  $('#rotate2').click(function() {
    $('.image-editor').cropit('rotateCW');
  });

  $('#rotate1').click(function() {
    $('.image-editor').cropit('rotateCCW');
  });

  $('#uploadMain').click(function(e) {
    e.preventDefault();
    imageDishData = $('.image-editor').cropit('export', {type:'image/jpeg', quality:.9});
    $.ajax({
      url: '/post-image',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded',
      data: {imageBinary:imageDishData},
      success: function() {
        console.log('success');
      },
      error: function() {
        console.log('failed');
      }
    });
      return false;
  });

  $('#plusOne').click(function() {
    $('#fileUploadMain').click();
  });

  $('.image-user').cropit({
    exportZoom: 1.25,
    imageState: {
      src: 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-524253160393/images/create/user.png',
    },
    type: 'image/jpeg',
    quality: .9
  });

  $('#rotate4').click(function() {
    $('.image-user').cropit('rotateCW');
  });

  $('#rotate3').click(function() {
    $('.image-user').cropit('rotateCCW');
  });

  $('#uploadUser').click(function(e) {
    e.preventDefault();
    imageUserData = $('.image-user').cropit('export', {type:'image/jpeg', quality:.9});
    $.ajax({
      url: '/post-image-user',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded',
      data: {imageBinary:imageUserData},
      success: function() {
        console.log('success');
      },
      error: function() {
        console.log('failed');
      }
    });
      return false;
  });

  $('#plusUser').click(function() {
    $('#fileUploadUser').click();
  });
});
