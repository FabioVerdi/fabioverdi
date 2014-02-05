var _apiURL = '//dev.ferasxperia.com.br/Api/Quiz/';
var _baseURL = 'http://dev.ferasxperia.com.br';
var userId = $('#hdn-userid').attr('value');
var _counter = 0;
var _questionNumber = 0;
var _again = true;
var _skipped;
var _paused;
var _quizId;
var _objAnswer = {};
var quiz = {
		init: function(){
			quiz.starter();
			//quiz.loadQuestions();
			quiz.bindings();
		},
		starter : function(){

		$.post(_apiURL + 'GetOrCreateQuizForUser/' +  userId, function(data) {
			_quizId = data.QuizId;

			quiz.loadQuestions();
		});
	},

	loadQuestions: function(){
	$('.holder-timer .timer').stopwatch({format: '{MM}:{ss}'});
	$('.holder-timer .totaltime').stopwatch({format: '{MM}:{ss}'});

	$.post(_apiURL + 'GetCurrentQuestionForQuiz/'+ _quizId, function(data) {
		_objQuestion = data;
		_quizQuestionId = data.QuizQuestionId;
		_question = data.Question.TheQuestion;
		_questionNumber = _objQuestion.QuestionNumber;
		_answers = data.Question.Answers;
		_correct = data.Question.CorrectAnswerId;
		_number = data.Question.QuestionNumber;
		quiz.populateQuestion();
	});
},

skipQuestion: function(){
	$('.btn-skip').hide();
	_skipped = true;
	$.post(_apiURL + 'GetCurrentQuestionForQuiz/'+ _quizId + '?reset=true', function(data) {
		_objQuestion = data;
		_quizQuestionId = data.QuizQuestionId;
		_question = data.Question.TheQuestion;
		_questionNumber = _objQuestion.QuestionNumber;
		_answers = data.Question.Answers;
		_correct = data.Question.CorrectAnswerId;
		_number = data.Question.QuestionNumber;
		quiz.populateQuestion();
	});
},

pauseQuestion: function(){
	_paused = true;
	clearInterval(timer);
	$('<div class="paused"></div>').appendTo('body').fadeTo(200, 0.8);
	$('div.paused').on('click', function(){
		$.post(_apiURL + 'GetCurrentQuestionForQuiz/'+ _quizId + '?reset=true', function(data) {
			_objQuestion = data;
			_quizQuestionId = data.QuizQuestionId;
			_question = data.Question.TheQuestion;
			_questionNumber = _objQuestion.QuestionNumber;
			_answers = data.Question.Answers;
			_correct = data.Question.CorrectAnswerId;
			_number = data.Question.QuestionNumber;
			quiz.populateQuestion();
			startWatch();
		});
	});
},

populateQuestion: function(){

		//_question = _questions[_counter];
		$('.holder-counter li').removeClass('current');
		$($('.holder-counter li')[_questionNumber-1]).addClass('current');
		$(".questions .options").fadeOut(function(){
			$(".lst-options li").remove();
			$('.questions .current').html(_questionNumber + '.');
			$(".questions .question").html(_question);
			$(".questions input[name=hdn-correct]").attr('value', _correct);

			$("#tmpl-options").tmpl(_answers).appendTo(".lst-options");
			$($('.lst-options li')[0]).find('.opt').html('a');
			$($('.lst-options li')[1]).find('.opt').html('b');
			$($('.lst-options li')[2]).find('.opt').html('c');
			$($('.lst-options li')[3]).find('.opt').html('d');

			if (_paused) {
				_paused = false;
				$('.btn-pause').hide();
				$('div.paused').remove();
			} else {
				$('.btn-pause').show();
			}
			if (_skipped) {
				_skipped = false;
				$('.btn-skip').hide();
			} else {
				$('.btn-skip').show();
			}
			$('.questions .options').fadeIn(function(){
				quiz.timer();
				$('.questions .btn-next').fadeTo(300, 0.2).removeAttr('href');
			});
			_counter++;
		});
	},

	timeOut: function() {
		clearInterval(timer);
		stopTimer();

		console.log( $('.questions .lst-options a[data-value!=' + $('.questions input[name=hdn-correct]').val() + ']').eq(0).attr('data-value') );

		$('.questions .lst-options a').fadeTo(300, 0.2);
		$('.questions .lst-options a').removeAttr('href');
		$('.questions .btn-next').fadeTo(300, 1).attr('href', 'javascript:;');



		_objAnswer = {
			"AnswerId": parseInt($('.questions .lst-options a[data-value!=' + $('.questions input[name=hdn-correct]').val() + ']').eq(0).data('value'), 10),
			"ElapsedTime": 1200
		}

	},

	submitAnswer: function(){
		$.ajax({
			url: _apiURL + 'AnswerQuestion/' + _quizQuestionId,
			type:"POST",
			data: JSON.stringify(_objAnswer),
			dataType: 'json',
			headers: {"Content-Type": "application/json"},
			success: function(data){
				if (_questionNumber < 10) {
					quiz.loadQuestions();
				} else {
					quiz.results();
				}
			}
		});
	},

	timer: function(){
		$('.holder-timer .timer').text(0);
		startWatch();
		startTimer();
	},

	start: function(){
		$('.questions').fadeIn(function(){
			quiz.loadQuestions();
		});
	},

	bindings: function() {
		$('.lst-options').on('click', 'a', function(e) {
			e.preventDefault();
			$('.lst-options a').removeClass('selected');
			$(this).toggleClass('selected');
			//$('.questions .submit').trigger('click');

			$('.questions .lst-options a').not('.selected').fadeTo(300, 0.2);
			$('.questions .lst-options a').not('.selected').removeAttr('href');
			$('.questions .btn-next').fadeTo(300, 1).attr('href', 'javascript:;');


			if ($('.questions .lst-options a.selected').data('value') == $('.questions input[name=hdn-correct]').val() ) {
				console.log('correct');
				$('.questions .lst-options a.selected').parent().addClass('correct');
				$($('.holder-counter li')[ (_questionNumber-1) ]).addClass('correct');
			} else {

				console.log('wrong');
				$('.questions .lst-options a.selected').parent().addClass('wrong');

				$('.questions .lst-options a[data-value=' + $('.questions input[name=hdn-correct]').val() + ']').fadeTo(100, 1).parent().addClass('correct');
				$($('.holder-counter li')[_questionNumber -1]).addClass('wrong');
			}
				clearInterval(timer);
				stopTimer();
				_objAnswer = {
					"AnswerId": $('.questions .lst-options a.selected').data('value'),
					"ElapsedTime": parseInt($('.holder-timer .timer').text(),10)
				}

		});

		$('.questions .btn-next').on('click', function(e) {
			e.preventDefault();
			quiz.submitAnswer();
			console.log(_objAnswer);
		});

		$('.btn-skip').on('click', function(){
			quiz.skipQuestion();
		});

		$('.btn-pause').on('click', function(){
			quiz.pauseQuestion();
		});
	},

	results: function(){
		$('.holder-timer .timer').stopwatch('stop');
		$('.holder-timer .totaltime').stopwatch('stop');
		$('#result .totaltime').html( $('.holder-timer .totaltime').html() );

		$.ajax({
			url: _apiURL + 'GetQuiz/' + _quizId,
			type:"GET",
			success: function(data){
				console.log(data);
				alert('quiz finalizado');
				window.location.href = _baseURL + '/Home/QuizFeedback/' + _quizId;
			}
		})
	}
};

$(document).ready(function(){
	quiz.init();
});