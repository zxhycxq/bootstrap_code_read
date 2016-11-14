/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    //传入元素,如果元素内部有dismiss上设置的自定义属性,则click事件会触发原型上的close方法
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')
    // 如果没有用data-target指定，则则尝试从href属性中取
    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      /*closest() 方法返回被选元素的第一个祖先元素。
      与parents() 不同
       如果上面没能取到有效的元素，则选择第一个class含alert的祖先
      http://www.runoob.com/jquery/traversing-closest.html*/
      $parent = $this.closest('.alert')
    }
    //trigger() 方法触发被选元素的指定事件类型。
    //新建一个'close.bs.alert'事件，并用该事件触发上面所选到的jquery对象
    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      // detach()函数用于从文档中移除匹配的元素。
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    // 根据选择器,遍历所有符合规则的元素,然后在元素上绑定插件的实例,以监控用户的事件行为
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }
  // 保留其他插件的$.fn.alert代码(如果定义),以便在noConflict之后,可以继续使用该旧代码
  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert
/*
 jQuery插件的定义使用了标准的方法，在fn上进行扩展。在附加扩展之前，
 首先“备份”之前插件（或别的框架提供的同名插件）的旧代码，以方便在后面防冲突的时候使用。
 在附加扩展之后，重新设置插件的构造器（即Constructor属性）为内部定义的插件类函数自身，
 这样就可以通过Constructor属性查询到插件的真实类函数，使用new操作符实例化$.fn.alert的时候也不会出错。
*/

  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============
/*
 // 绑定触发事件
 // 为声明式的HTML绑定单击事件
 // 在整个document对象上，检测是否有自定义属性data-dismiss="alert"
 // 如果有,则设置:单击的时候,关闭指定的警告框元素

  */
  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
