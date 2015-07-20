/**
 * Created by brian.milton on 20/07/2015.
 */
'use strict';
(function($){

    $(document).ready(function(){

        var elementToDisplayWinner = $('#AndTheWinnerIs');
        var isIdling = true;
        var nonUnicodeChars = [12353, 12439, 12440, 12441, 12442, 12443, 12444, 12445, 12446, 12447, 12539, 12540, 12541, 12542, 12543, 12544, 12545, 12546, 12547, 12548, 12589, 12590, 12591];

        var idleSpinner = setInterval(function(){

            var str='', i, tempChar;

            for(i=0; i<15; i++) {

                do {

                    tempChar = 12353 + (Math.floor(Math.random() * (12588 - 12353) + 1));
                    //console.log(parseInt(tempChar,16));

                } while (nonUnicodeChars.indexOf(tempChar) >= 0);

                // This is the unicode block with hiragana, katakana and bopomofo. Makes it look Matrix-y.
                str += String.fromCharCode(tempChar);

            }

            $('#AndTheWinnerIs').text(str);

        },100);

        $.ajax('entries.json').done(function(data){

            if(Array.isArray(data) && typeof data[0] === 'object') {

                // Array of objects... Although since I'm the only one using this, it's a bit redundant, but hey hoi.

            } else {

                // Maybe it's a JSON string we have?
                try {

                    data = JSON.parse(data);

                    $('#stopButton').removeAttr('disabled');

                    $('#stopButton').on('click', function(){

                        // Something between 5 and 10 seconds.
                        var timeout = Math.floor(5000 + (Math.random() * 5000 + 1));

                        while(timeout--) {
                            $('#timerDisplay').text(timeout);
                        }

                    });

                } catch(err) {

                    // We have a visit from the fuck-up fairy...
                    console.log(err);

                }

            }

        });

    });

})(jQuery);