MailPile.prototype.render_thread_message = function(mid) {
  
  $.ajax({
    url			 : mailpile.api.message + mid + "/single.jhtml",
    type		 : 'GET',
    dataType : 'json',
    success  : function(response) {
      if (response.result) {
        $('#snippet-' + mid).replaceWith(response.result);
      }
    },
    error: function() {
      mailpile.notification('error', 'Could not retrieve message');
    }
  });
};


/* Thread - iframe styling */
MailPile.prototype.thread_html_iframe = function(element) {

  var new_iframe_height = $(element).contents().height();
  $('.thread-item-html').height(new_iframe_height);

  $(element).contents().find('body div').addClass('thread-item-html-text');
};


/* Thread - Show People In Conversation */
$(document).on('click', '.show-thread-people', function() {

 //alert('FIXME: Show all people in conversation');
 var options = {
   backdrop: true,
   keyboard: true,
   show: true,
   remote: false
 };

 $('#modal-full .modal-title').html($('#thread-people').data('modal_title'));
 $('#modal-full .modal-body').html($('#thread-people').html());
 $('#modal-full').modal(options);
});


/* Thread - Show Tags In Converstation */
$(document).on('click', '.show-thread-tags', function() {

 var options = {
   backdrop: true,
   keyboard: true,
   show: true,
   remote: false
 };

 $('#modal-full .modal-title').html($('#thread-tags').data('modal_title'));
 $('#modal-full .modal-body').html($('#thread-tags').html());
 $('#modal-full').modal(options);
});


/* Thread - Show Security */
$(document).on('click', '.show-thread-security', function() {
  
  alert('FIXME: Show details about security of thread');
});


/* Thread - Show Metadata Info */
$(document).on('click', '.show-thread-message-metadata-details', function() {
  var mid = $(this).data('mid');
  var target = '#metadata-details-' + mid;
  if ($(target).css('display') === 'none') {
    $(target).show('fast');
    $(this).css('color', '#4d4d4d');
  }
  else {
    $(target).hide('fast');    
    $(this).css('color', '#ccc');
  }
});


/* Thread - Expand Snippet */
$(document).on('click', 'div.thread-snippet', function(e) {  
  var mid = $(this).data('mid');
  if (e.target.href === undefined && $(e.target).data('expand') !== 'no' && $(e.target).hasClass('show-thread-message-metadata-details') === false) {
    mailpile.render_thread_message(mid);
  }
});


/* Thread - Message Quote */
$(document).on('click', '.thread-message-actions-quote', function() {
  var mid = $(this).parent().parent().data('mid');
  $('#message-' + mid).find('.thread-item-quote').removeClass('hide');
  $('#message-' + mid).find('.thread-item-signature').removeClass('hide');
  $(this).parent().hide();
});


/* Thread - Might Move to Global Location / Abstraction */
$(document).on('click', '.dropdown-toggle', function() {
  $(this).find('.icon-arrow-right').removeClass('icon-arrow-right').addClass('icon-arrow-down');
});


/* Thread Tooltips */
$(document).ready(function() {

  // Thread Scroll to Message
  if (location.href.split("thread/=")[1]) {

    // Scroll to Message
    var thread_id = location.href.split("thread/=")[1].split("/")[0];
    var msg_top_pos = $('#message-' + thread_id).position().top;
    $('#content-view').scrollTop(msg_top_pos - 150);
    setTimeout(function(){
      $('#content-view').animate({ scrollTop: msg_top_pos }, 350);
    }, 50);
    
    // Show Tooltips
    mailpile.thread_initialize_tooltips();
  }
});