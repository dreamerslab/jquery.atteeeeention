/*! Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.0
*
* Requires: jQuery 1.2.6+
*/
$.fn.atteeeeention = function( options ){
  
  return this.each( function(){
    
    // merge user options with default setings
    var configs = $.extend({ 
      margin : 12,
      hideLastRow : false 
    }, options ),
    
    // cache jquery obj
    $this = $( this ),
    $imgs = $this.find( 'img' ),
    
    // cache obj prop to local var
    margin = configs.margin,
    
    // init values
    imgCount = $imgs.length,
    loadedImgCount = 0,
    containerWidth = $this.innerWidth(),
    imgWrapWidth,
    rowWidths = [],
    rowWidth = 0,
    rowHeight = 1000,
    rowItems = 0,
    appliedImg = 0,
    
    beautify = function(){
      var diff = containerWidth - ( rowWidth - imgWrapWidth ) + margin,
      extra = Math.floor( diff / rowItems ),
      // the gap that Math.floor produced
      gap = diff - ( extra * rowItems ),
      realWidth = 0;
      
      // each img in a row
      $.each( rowWidths, function( i, width ){
        var $img = $( $imgs[ appliedImg ]),
        $wrap = $img.parent();
        // record width to parent scope to find the last img width
        realWidth = width + extra;
        
        // apply min height to all images in a row
        $wrap.height( rowHeight );
        
        // clear margin-right for every last row element
        if( rowItems === ( i + 1 )){
          $wrap.css( 'margin-right' , 0 );
          
          // fill the gap for last img
          $img.width( realWidth + gap );
        }else{
          $img.width( realWidth );
        }
        appliedImg++;
      });
    },
    
    lastRow = function(){
      var i = 0, j = rowItems;
      
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
      display : 'inline',
      'margin-top' : 0,
      'margin-right' : margin,
      'margin-bottom' : margin,
      'margin-left' : 0,
      overflow : 'hidden',
      'vertical-align': 'top'
    });
    
    // ie has bug with img.load event
    // we have to remove all src attr,
    // attach load event and write back its src
    $imgs.each( function(){
      
      // cache jquery obj
      var $img = $( this ),
      src = $img.attr( 'src' );
      
      $img.attr( 'src', '' ).load( function(){
        
        loadedImgCount++;
        
        // all img loaded
        if( loadedImgCount === imgCount ){
          
          $imgs.each( function( i ){
            // cache jquery obj
            var $img = $( this ),
            
            // current thumbnail width
            currentWidth = $img.width(),
            
            // current thumbnail height
            currentHeight = $img.height();
            
            // add 12 for wrapper margin-right
            imgWrapWidth = currentWidth + margin;

            rowWidth = rowWidth + imgWrapWidth;
            
            // get the smallest height
            if( currentHeight < rowHeight ) rowHeight = currentHeight;
            
            // this statement determine how many imgs in a row
            if( rowWidth > containerWidth ){

              beautify();
              
              // reset
              rowWidth = imgWrapWidth;
              rowHeight = currentHeight;
              // not empty array, we have to record currnet img info
              rowWidths = [ currentWidth ];
              // not 0, we have already add 1 item in this statement
              rowItems = 1;
            }else{
              rowWidths.push( currentWidth );
              rowItems++;
            }
            // it has to be here, otherwise it will not fire when the imgCount = 1
            if(( imgCount - 1 ) === i ) lastRow();
          }); // end $imgs.each
        }; // end if
      }).attr( 'src', src );
    }); // end $imgs.each
  });
};