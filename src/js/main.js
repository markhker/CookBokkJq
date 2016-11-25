
$(function() {

  $('.disabled').prop('disabled', true);
  $('.adminDeactivated').prop('disabled', true);
  $('#previewInstructions').hide();
  $('#previewAbout').hide();
  $('#btnIng').prop('disabled', true);
  
  $('#btnIng').click(function(e) {
    e.preventDefault();
    $('#btnIng').addClass('active');
    $('#btnIng').prop('disabled', true);
    $('#previewInstructions').fadeOut();
    $('#previewAbout').fadeOut();
    $('#previewIngredients').fadeIn();
    $('#btnInst').removeClass('active').prop('disabled', false);
    $('#btnAbout').removeClass('active').prop('disabled', false);
  });
  
  $('#btnInst').click(function(e) {
    e.preventDefault();
    $('#btnInst').addClass('active');
    $('#btnInst').prop('disabled', true);
    $('#previewIngredients').fadeOut();
    $('#previewAbout').fadeOut();
    $('#previewInstructions').fadeIn();
    $('#btnIng').removeClass('active').prop('disabled', false);
    $('#btnAbout').removeClass('active').prop('disabled', false);
  });
  
  $('#btnAbout').click(function(e) {
    e.preventDefault();
    $('#btnAbout').addClass('active');
    $('#btnAbout').prop('disabled', true);
    $('#previewIngredients').fadeOut();
    $('#previewInstructions').fadeOut();
    $('#previewAbout').fadeIn();
    $('#btnIng').removeClass('active').prop('disabled', false);
    $('#btnInst').removeClass('active').prop('disabled', false);
  });

  $('#acceptance').keypress(function() {
    if($('#acceptance').val()) {
      $('.next').prop('disabled', false).removeClass('disabled');
    }
  });

  $('#acceptance').change(function() {
    if (!$('#acceptance').val()) {
      $('.next').prop('disabled', true).addClass('disabled');
    }
  });

  /*FORMS AI*/
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  $('#loginForm').bind('submit', function(e) {

    $.ajax({
      url: '/loginForm',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify($('#loginForm').serializeObject()),
      success: function() {
        console.log('success');
        window.location = '/upload';
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
      }
    });
    return false;
  });


  /*ENDS FORMS AI*/

  /*ADD ITEMS UPLOAD FORM*/
  var counter1 = 1;
  $('#addIng-1').click(function(e) {
    e.preventDefault();
    $('#loi-1').append('<input type="text" class="input" id="recipeIngredient_'+counter1+'" name="recipeIngredient_'+counter1+'" placeholder="Example: 1 cup of flour">')
  });

  var counter2 = 2;
  $('#addIng-2').click(function(e) {
    e.preventDefault();
    $('#loi-2').append('<input type="text" class="input" id="recipeIngredient_'+counter2+'" name="recipeIngredient_'+counter2+'" placeholder="Example: 8oz chocolate chips">')
  });

  var counter3 = 3;
  var counter4 = 4;
  var counter5 = 5;

  function appendClicker1() {
    $('#addIng-3').click(function(e) {
      e.preventDefault();
      $('#loi-3').append('<input type="text" class="input" id="recipeIngredient_'+counter3+'" name="recipeIngredient_'+counter3+'" placeholder="Example: 8oz chocolate chips">')
    });
  };

  function appendClicker2() {
    $('#addIng-4').click(function(e) {
      e.preventDefault();
      $('#loi-4').append('<input type="text" class="input" id="recipeIngredient_'+counter4+'" name="recipeIngredient_'+counter4+'" placeholder="Example: 8oz chocolate chips">')
    });
  };

  function appendClicker3() {
    $('#addIng-5').click(function(e) {
      e.preventDefault();
      $('#loi-5').append('<input type="text" class="input" id="recipeIngredient_'+counter5+'" name="recipeIngredient_'+counter5+'" placeholder="Example: 8oz chocolate chips">')
    });
  };


  var setIng = 3;
  $('#addSetIng').click(function(e) {
    e.preventDefault();

    if(setIng == 3) {
      $('#dividerForm').append('<div class="divPartForm coll1024"><div class="formGroup lister" id="ingredients"><label for="setIngredient_'+setIng+'" class="label ing">3<sup>rd</sup> set of Ingredients:</label><div class="setOfIngredients"><input type="text" class="input" id="setIngredient_'+setIng+'" name="setIngredient_'+setIng+'" placeholder="Example: Cake"></div></div><div class="formGroup lister" id="ingredients"><label for="recipeIngredient_'+setIng+'" class="label">List:</label><div class="listOfIngredients" id="loi-'+setIng+'"><input type="text" class="input" id="recipeIngredient_'+setIng+'" name="recipeIngredient_'+setIng+'" placeholder="Example: 1 cup of flour"></div><p><a href="#!" class="addIngredient" id="addIng-'+setIng+'">+Add ingredient</a></p></div></div>');
      appendClicker1()
    } else if(setIng == 4) {
      $('#dividerForm').append('<div class="divPartForm coll1024"><div class="formGroup lister" id="ingredients"><label for="setIngredient_'+setIng+'" class="label ing">4<sup>th</sup> set of Ingredients:</label><div class="setOfIngredients"><input type="text" class="input" id="setIngredient_'+setIng+'" name="setIngredient_'+setIng+'" placeholder="Example: Cake"></div></div><div class="formGroup lister" id="ingredients"><label for="recipeIngredient_'+setIng+'" class="label">List:</label><div class="listOfIngredients" id="loi-'+setIng+'"><input type="text" class="input" id="recipeIngredient_'+setIng+'" name="recipeIngredient_'+setIng+'" placeholder="Example: 1 cup of flour"></div><p><a href="#!" class="addIngredient" id="addIng-'+setIng+'">+Add ingredient</a></p></div></div>');
      appendClicker2()
    } else if(setIng == 5) {
      $('#dividerForm').append('<div class="divPartForm coll1024"><div class="formGroup lister" id="ingredients"><label for="setIngredient_'+setIng+'" class="label ing">5<sup>th</sup> set of Ingredients:</label><div class="setOfIngredients"><input type="text" class="input" id="setIngredient_'+setIng+'" name="setIngredient_'+setIng+'" placeholder="Example: Cake"></div></div><div class="formGroup lister" id="ingredients"><label for="recipeIngredient_'+setIng+'" class="label">List:</label><div class="listOfIngredients" id="loi-'+setIng+'"><input type="text" class="input" id="recipeIngredient_'+setIng+'" name="recipeIngredient_'+setIng+'" placeholder="Example: 1 cup of flour"></div><p><a href="#!" class="addIngredient" id="addIng-'+setIng+'">+Add ingredient</a></p></div></div>');
      appendClicker3()
    };

    setIng++;

    if(setIng === 6) {
        $(this).hide();
    }
  });

  /*STEPS*/
  var step1 = 2;
  $('#addStep-1').click(function(e) {
    e.preventDefault();
    $('#los-1').append('<div class="wrapSteps"><label for="recipeStep_1" class="label ing">'+step1+'.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep_1" name="recipeStep_1" placeholder="Example: Mix the ingredients..."></div></div>')
    step1++;
  });

  var step2 = 2;
  $('#addStep-2').click(function(e) {
    e.preventDefault();
    $('#los-2').append('<div class="wrapSteps"><label for="recipeStep_2" class="label ing">'+step2+'.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep_2" name="recipeStep_2" placeholder="Example: Mix the ingredients..."></div></div>')
    step2++;
  });

  var step3 = 2;
  var step4 = 2;
  var step5 = 2;

  function appendClicker4() {
    $('#addStep-3').click(function(e) {
      e.preventDefault();
      $('#los-3').append('<div class="wrapSteps"><label for="recipeStep_3" class="label ing">'+step3+'.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep_3" name="recipeStep_3" placeholder="Example: Mix the ingredients..."></div></div>')
      step3++;
    });
  };

  function appendClicker5() {
    $('#addStep-4').click(function(e) {
      e.preventDefault();
      $('#los-4').append('<div class="wrapSteps"><label for="recipeStep_4" class="label ing">'+step4+'.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep_4" name="recipeStep_4" placeholder="Example: Mix the ingredients..."></div></div>')
      step4++;
    });
  };

  function appendClicker6() {
    $('#addStep-5').click(function(e) {
      e.preventDefault();
      $('#los-5').append('<div class="wrapSteps"><label for="recipeStep_5" class="label ing">'+step5+'.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep_5" name="recipeStep_5" placeholder="Example: Mix the ingredients..."></div></div>')
      step5++;
    });
  };


  var setStep = 3;
  $('#addSetSteps').click(function(e) {
    e.preventDefault();
    $('#instructionsSets').append('<div class="formGroup lister"><label for="recipeMethod_'+setStep+'" class="label ing">Instructions for Set '+setStep+':</label><div class="instructions"><input type="text" class="input" id="recipeMethod_'+setStep+'" name="recipeMethod_'+setStep+'" placeholder="Example: Icing"></div></div><h3 class="steps">Steps:</h3><div class="formGroup lister itemStep" id="los-'+setStep+'"><div class="wrapSteps"><label for="recipeStep_'+setStep+'" class="label ing">1.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep_'+setStep+'" name="recipeStep_'+setStep+'" placeholder="Example: Warm chocolate chips..."></div></div></div><p><a href="#!" class="addStep" id="addStep-'+setStep+'">+Add step</a></p>');

    if(setStep == 3) {
      appendClicker4()
    } else if(setStep == 4) {
      appendClicker5()
    } else if(setStep == 5) {
      appendClicker6()
    };

    setStep++;

    if(setStep === 6) {
        $(this).hide();
    }
  });
  /*ENDS ADD ITEMS UPLOAD FORM*/

  /*SEND UPLOAD FORM*/
  $('#uploadRecipe').bind('submit', function(e) {

    $.ajax({
      url: '/uploadRecipe',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify($('#uploadRecipe').serializeObject()),
      success: function() {
        console.log('success');
        window.location = '/preview';
      },
      error: function() {
        console.log('failed');
      }
    });
    return false;
  });
  
  $('#mainSender').click(function(e) {
    e.preventDefault();
    window.location = '/thanks';
  });
  
  $('#editSender').click(function(e) {
    e.preventDefault();
    window.location = '/edit';
  });
  
  /* ADMIN REVIEWER */
  $('.adminReview').click(function(e) {
    var key = this.dataset.key;
    e.preventDefault();
    $.ajax({
      url: '/adminedit',
      type: 'post',
      data: {'key': key},
      success: function() {
        console.log('success');
        window.location = '/adminreview';
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
      }
    });
    return false;
  });
  
  /* ENDS ADMIN REVIEWER */
});
