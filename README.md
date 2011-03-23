# jQuery Atteeeeention Plugin

A 'Google Image Search style' image alignment jQuery plugin.

## Description
If you have a image gallery with different width and height for each image, your page may look messy. Use this plugin to align your gallery with a 'Google Image Search' style result.


## Requires
  - jQuery 1.2.6+

## Browser Compatibility
  - [Firefox](http://mzl.la/RNaI) 2.0+
  - [Internet Explorer](http://bit.ly/9fMgIQ) 6+
  - [Safari](http://bit.ly/gMhzVR) 3+
  - [Opera](http://bit.ly/fWJzaC) 10.6+
  - [Chrome](http://bit.ly/ePHvYZ) 8+

## Installation
  - First, make sure you are using valid [DOCTYPE](http://bit.ly/hQK1Rk)
  - Include nessesary JS files

<!-- -->

      <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
      <script type="text/javascript" src="path-to-file/jquery.atteeeeention.js"></script>

  - add these css styles to your stylesheet

<!-- -->

    .clearfix:after{
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    .clearfix{
      display: inline-block;
    }
    * html .clearfix{
      height: 1%;
    }
    .clearfix{
      display: block;
    }

## Options

#### margin
- description: space between images( margin-right and margin-bottom )
- data type: integer
- default value: 12
- possible value: any integer
- sample code

<!-- -->

    $( '#gallery' ).atteeeeention({
      margin: 20
    });

#### hideLastRow
- description: sometimes the last row might not have enough images, if you want your gallery to look prettier you can set this option to true to hide the last row
- data type: bool
- default value: false
- possible value: true, false
- sample code

<!-- -->

    $( '#gallery' ).atteeeeention({
      hideLastRow: true
    });

## HTML markup
> Sample code

<!-- -->
    
    // this is the markup for $( '#gallery' ).atteeeeention();
    <div id="gallery">
      <a href="/img/a.jpg">
        <img src="/img/a-thumb.jpg"/>
      </a>
      <a href="/img/a.jpg">
        <img src="/img/a-thumb.jpg"/>
      </a>
      <a href="/img/a.jpg">
        <img src="/img/a-thumb.jpg"/>
      </a>
      ....
    </div>

- 'div' can be replaced with 'ul', 'ol' or any other block element.
- 'class' can be used instead of 'id' 
- 'a' can be replaced with 'div', 'span', or any other tag

## Demo
Please see demo.html 

## License

The expandable plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2011 [Ben Lin](http://dreamerslab.com)