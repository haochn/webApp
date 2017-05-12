(function() {
    $('.box').each(function() {
        $(this).click(function() {
            var index = $(this).index();
            console.log(this);
            console.log(index)
            if (index == 0) {
                window.location.href = "./book.html"
            }
            if (index == 1) {
                window.location.href = "./book2.html"
            }
            if (index == 2) {
                window.location.href = "./book3.html"
            }
            if (index == 3) {
                window.location.href = "./book4.html"
            }
        })
    })
})();