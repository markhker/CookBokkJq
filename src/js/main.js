
$(function() {

  $('.disabled').prop('disabled', true);

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
      error: function() {
        console.log('failed');
      }
    });
    return false;
  });


  /*ENDS FORMS AI*/

  /*ADD ITEMS UPLOAD FORM*/
  var counter1 = 2;
  $('#addIng-1').click(function(e) {
    e.preventDefault();
    $('#loi-1').append('<input type="text" class="input" id="recipeIngredient-'+counter1+'" name="recipeIngredient-'+counter1+'" placeholder="Example: 1 cup of flour">')
    counter1++;
  });

  var counter2 = 2;
  $('#addIng-2').click(function(e) {
    e.preventDefault();
    $('#loi-2').append('<input type="text" class="input" id="recipeIngredient2-'+counter2+'" name="recipeIngredient2-'+counter2+'" placeholder="Example: 8oz chocolate chips">')
    counter2++;
  });

  var counter3 = 2;
  var counter4 = 2;
  var counter5 = 2;

  function appendClicker1() {
    $('#addIng-3').click(function(e) {
      e.preventDefault();
      $('#loi-3').append('<input type="text" class="input" id="recipeIngredient3-'+counter3+'" name="recipeIngredient3-'+counter3+'" placeholder="Example: 8oz chocolate chips">')
      counter3++;
    });
  };

  function appendClicker2() {
    $('#addIng-4').click(function(e) {
      e.preventDefault();
      $('#loi-4').append('<input type="text" class="input" id="recipeIngredient4-'+counter4+'" name="recipeIngredient4-'+counter4+'" placeholder="Example: 8oz chocolate chips">')
      counter4++;
    });
  };

  function appendClicker3() {
    $('#addIng-5').click(function(e) {
      e.preventDefault();
      $('#loi-5').append('<input type="text" class="input" id="recipeIngredient5-'+counter5+'" name="recipeIngredient5-'+counter5+'" placeholder="Example: 8oz chocolate chips">')
      counter5++;
    });
  };


  var setIng = 3;
  $('#addSetIng').click(function(e) {
    e.preventDefault();
    $('#dividerForm').append('<div class="divPartForm coll1024"><div class="formGroup lister" id="ingredients"><label for="setIngredient-'+setIng+'" class="label ing">Ingredients:</label><div class="setOfIngredients"><input type="text" class="input" id="setIngredient-'+setIng+'" name="setIngredient-'+setIng+'" placeholder="Example: Cake"></div></div><div class="formGroup lister" id="ingredients"><label for="recipeIngredient-'+setIng+'" class="label">List:</label><div class="listOfIngredients" id="loi-'+setIng+'"><input type="text" class="input" id="recipeIngredient'+setIng+'-1" name="recipeIngredient'+setIng+'-1" placeholder="Example: 1 cup of flour"></div><p><a href="#!" class="addIngredient" id="addIng-'+setIng+'">+Add ingredient</a></p></div></div>');

    if(setIng == 3) {
      appendClicker1()
    } else if(setIng == 4) {
      appendClicker2()
    } else if(setIng == 5) {
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
    $('#los-1').append('<div class="wrapSteps"><label for="recipeSteps-'+step1+'" class="label ing">'+step1+'.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep-'+step1+'" name="recipeStep-'+step1+'" placeholder="Example: Mix the ingredients..."></div></div>')
    step1++;
  });

  var step2 = 2;
  $('#addStep-2').click(function(e) {
    e.preventDefault();
    $('#los-2').append('<div class="wrapSteps"><label for="recipeSteps-'+step2+'" class="label ing">'+step2+'.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep-'+step2+'" name="recipeStep-'+step2+'" placeholder="Example: Mix the ingredients..."></div></div>')
    step2++;
  });

  var step3 = 2;
  var step4 = 2;
  var step5 = 2;

  function appendClicker4() {
    $('#addStep-3').click(function(e) {
      e.preventDefault();
      $('#los-3').append('<div class="wrapSteps"><label for="recipeSteps-'+step3+'" class="label ing">'+step3+'.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep-'+step3+'" name="recipeStep-'+step3+'" placeholder="Example: Mix the ingredients..."></div></div>')
      step3++;
    });
  };

  function appendClicker5() {
    $('#addStep-4').click(function(e) {
      e.preventDefault();
      $('#los-4').append('<div class="wrapSteps"><label for="recipeSteps-'+step4+'" class="label ing">'+step4+'.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep-'+step4+'" name="recipeStep-'+step4+'" placeholder="Example: Mix the ingredients..."></div></div>')
      step4++;
    });
  };

  function appendClicker6() {
    $('#addStep-5').click(function(e) {
      e.preventDefault();
      $('#los-5').append('<div class="wrapSteps"><label for="recipeSteps-'+step5+'" class="label ing">'+step5+'.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep-'+step5+'" name="recipeStep-'+step5+'" placeholder="Example: Mix the ingredients..."></div></div>')
      step5++;
    });
  };


  var setStep = 3;
  $('#addSetSteps').click(function(e) {
    e.preventDefault();
    $('#instructionsSets').append('<div class="formGroup lister"><label for="recipeMethod'+setStep+'-1" class="label ing">Instructions</label><div class="instructions"><input type="text" class="input" id="recipeMethod'+setStep+'-1" name="recipeMethod'+setStep+'-1" placeholder="Example: Icing"></div></div><h3 class="steps">Steps:</h3><div class="formGroup lister itemStep" id="los-'+setStep+'"><div class="wrapSteps"><label for="recipeSteps'+setStep+'-1" class="label ing">1.</label><div class="listOfSteps"><input type="text" class="input" id="recipeStep'+setStep+'-1" name="recipeStep'+setStep+'-1" placeholder="Example: Warm chocolate chips..."></div></div></div><p><a href="#!" class="addStep" id="addStep-'+setStep+'">+Add step</a></p>');

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
        window.location = '/upload';
      },
      error: function() {
        console.log('failed');
      }
    });
    return false;
  });

});
