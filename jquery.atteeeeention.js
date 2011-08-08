/*! Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.2
*
* Requires: jQuery 1.2.6+
*/
;( function( $ ){
  $.fn.atteeeeention = function( options ){
  
    return this.each( function(){
      var configs, $this, $imgs, margin, imgCount, loadedImgCount, containerWidth, imgWrapWidth, 
          rowWidths, rowHeight, rowItems, appliedImg, beautify, lastRow;
          
      // merge user options with default setings
      configs = $.extend({ 
        margin : 12,
        hideLastRow : false 
      }, options );
    
      $this          = $( this );
      $imgs          = $this.find( 'img' );
      margin         = configs.margin; 
      imgCount       = $imgs.length;
      // init values
      loadedImgCount = 0;
      containerWidth = $this.innerWidth();
      rowWidths      = [];
      rowWidth       = 0;
      rowHeight      = 1000;
      rowItems       = 0;
      appliedImg     = 0;
    
      beautify = function(){
        var diff, extra, gap, realWidth;
        
        diff      = containerWidth - ( rowWidth - imgWrapWidth ) + margin;
        extra     = Math.floor( diff / rowItems );
        gap       = diff - ( extra * rowItems ); // the gap that Math.floor produced
        realWidth = 0;
      
        // each img in a row
        $.each( rowWidths, function( i, width ){
          var $img, $wrap;
          
          $img      = $( $imgs[ appliedImg ]);
          $wrap     = $img.parent();
          realWidth = width + extra; // record width to parent scope to find the last img width
        
          // apply min height to all images in a row
          $wrap.height( rowHeight );
        
          // clear margin-right for every last row element
          if( rowItems === ( i + 1 )){
            $wrap.css( 'margin-right' , 0 );
            $img.width( realWidth + gap ); // fill the gap for last img
          }else{
            $img.width( realWidth );
          }
          appliedImg++;
        });
      };
    
      lastRow = function(){
        var i, j;
        
        i = 0; 
        j = rowItems;
      
        // hide the last row images if the option set to true
        if( configs.hideLastRow === true ){
          for( ; i < j; i++ ){
            $( $imgs[ appliedImg ]).parent().hide();
            appliedImg++;
          }
        }else{
          // apply hieight to images in the last row
          for( ; i < j; i++ ){
            $( $imgs[ appliedImg ]).parent().height( rowHeight );
            appliedImg++;
          }
        }
      };
    
      $this.addClass( 'clearfix' );
    
      // apply basic styles
      $imgs.css({
        border : 0,
        margin : 0,
        padding : 0
      }).
      parent().css({
        'float' : 'left',
        'display' : 'inline',
        'margin-top' : 0,
        'margin-right' : margin,
        'margin-bottom' : margin,
        'margin-left' : 0,
        'overflow' : 'hidden',
        'vertical-align': 'top'
      });
    
      // ie has bug with img.load event
      // we have to remove all src attr,
      // attach load event and write back its src
      $imgs.each( function(){
        var $img, src;
        
        $img = $( this );
        src  = $img.attr( 'src' );
      
        $img.attr( 'src', '' ).load( function(){
        
          loadedImgCount++;
        
          // all img loaded
          loadedImgCount === imgCount &&
            $imgs.each( function( i ){
              var $img, currentWidth, currentHeight;
              
              $img          = $( this );
              currentWidth  = $img.width(); // current thumbnail width
              currentHeight = $img.height(); // current thumbnail height
              imgWrapWidth  = currentWidth + margin; // add 12 for wrapper margin-right
              rowWidth      = rowWidth + imgWrapWidth;
            
              // get the smallest height
              if( currentHeight < rowHeight ) rowHeight = currentHeight;
            
              // this statement determine how many imgs in a row
              if( rowWidth > containerWidth ){

                beautify();
                // reset
                rowWidth  = imgWrapWidth;
                rowHeight = currentHeight;
                rowWidths = [ currentWidth ]; // not empty array, we have to record currnet img info
                rowItems  = 1; // not 0, we have already add 1 item in this statement
              }else{
                rowWidths.push( currentWidth );
                rowItems++;
              }
              // it has to be here, otherwise it will not fire when the imgCount = 1
              imgCount - 1 === i && lastRow();
            }); // end $imgs.each
        }).attr( 'src', src );
      }); // end $imgs.each
    });
  };
})( jQuery );
