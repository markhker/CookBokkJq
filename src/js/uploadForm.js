$(function() {

  var imageDishData, imageUserData;

  $('#rotate2').click(function() {
    $('#portImage').cropit('rotateCW');
  });

  $('#rotate1').click(function() {
    $('#portImage').cropit('rotateCCW');
  });

  $('#uploadMain').click(function(e) {
    e.preventDefault();
    imageDishData = $('#portImage').cropit('export', {type:'image/jpeg', quality:.9});
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
  
  $('#uploadMain').prop('disabled', true);
  $('#uploadUser').prop('disabled', true);
  
   $('#uploadMain').click(function() {
     $('#uploadMain').prop('disabled', true).addClass('disabled');
   });
  
  $('#uploadUser').click(function() {
     $('#uploadUser').prop('disabled', true).addClass('disabled');
   });

  $('#plusOne').click(function() {
    $('#fileUploadMain').click();
    $('#uploadMain').prop('disabled', false).removeClass('disabled');
  });
  
  $('#plusUser').click(function() {
    $('#fileUploadUser').click();
    $('#uploadUser').prop('disabled', false).removeClass('disabled');
  });

  $('#rotate4').click(function() {
    $('#imageUser').cropit('rotateCW');
  });

  $('#rotate3').click(function() {
    $('#imageUser').cropit('rotateCCW');
  });

  $('#uploadUser').click(function(e) {
    e.preventDefault();
    imageUserData = $('#imageUser').cropit('export', {type:'image/jpeg', quality:.9});
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
});
