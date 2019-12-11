// ReSharper disable StringLiteralWrongQuotes
; (function($) {
    'use strict';
    $("#employment-card-view").appendTo(".content");

    $("#custom-toggle").click(function () {
        window.loader.show();
        document.cookie = "showCardView=" + true + ";expires=01 Jan 2030 00:00:00";
        var redirectLocation = window.location.href.split("?")[0];
        window.location.href = redirectLocation;
    })

    $(document).off('click.buttonwaiter', 'button[type=submit]').on('click.buttonwaiter', 'button[type=submit]', function(e) {
        e.preventDefault();

        $(document).trigger('advancedquery.submit');
    });

    $('#ShowEndedEmployments, #PageSize').off('change.submitChanges').on('change.submitChanges', function(e) {
        e.preventDefault();

        $(document).trigger('advancedquery.submit');
    });

    $('thead tr th :input').off('keydown.submitChanges').on('keydown.submitChanges', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            return $(document).trigger('advancedquery.submit');
        }

        return true;
    });

    $('button[type=reset]').removeClass('is-hidden').click(function(e) {
        e.preventDefault();
        e.stopPropagation();

        $('.datatable :input').val('');

        return $(document).trigger('advancedquery.submit');
    });

    $('#newEmployment').removeClass('is-hidden');

    $('#AdvancedQueryHolder').removeClass('is-hidden');
}(jQuery));
// ReSharper restore StringLiteralWrongQuotes