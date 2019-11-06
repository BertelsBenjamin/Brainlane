(function ($) {
    //BUTTONS
    let btnJavascript = $('#btn-get-html-css-js');
    let btnSql = $('#btn-get-sql');
    let btnAngularNode = $('#btn-get-ng-node');
    //REPOSITORIES
    let repositories = [];
    let reposJavaScript = [];
    let reposSql = [];
    let reposAngular = [];
    //CARDS
    let cardJS = $('#card-js-0');
    let cardSQL = $('#card-sql-0');
    let cardAngular = $('#card-ng-0');
    //CARD INJECTORS
    let injectorJS = $('#card-injector-js');
    let injectorSQL = $('#card-injector-sql');
    let injectorAngular = $('#card-injector-ng');
    //LANGUAGE ABBREVIATIONS
    let abbrJs = 'js';
    let abbrSql = 'sql';
    let abbrAngular = 'ng';

    function getRepositories() {
        $.ajax({
            url: "https://api.github.com/users/BertelsBenjamin/repos",
            context: document.body
        }).done(function (data) {
            data.forEach((element) => {
                if (element.language !== null) {
                    repositories.push(element);
                }
            })
            console.group('Repositories');
            console.log(repositories);
            console.groupEnd('Repositories');
            fillCards(cardJS, injectorJS, reposJavaScript, abbrJs, 'JavaScript', 'PostScript');
            fillCards(cardSQL, injectorSQL, reposSql, abbrSql, 'PLpgSQL', null);
            fillCards(cardAngular, injectorAngular, reposAngular, abbrAngular, 'TypeScript', null);
        }).fail((err) => {
            console.log(err);
        });
    }

    function fillCards(card, injector, repos, abbreviation, language1, language2) {
        console.log('test')
        repositories.forEach((element) => {
            if (element.language == language1 || element.language == language2) {
                repos.push(element);
            }
        })
        repos.forEach((element, i) => {
            let newCard = card.clone(true)
            $(newCard).attr('id', 'card-' + abbreviation + '-' + (i + 1))
            debugger
            card.removeAttr('hidden')
            $(card[0].childNodes[1].childNodes[1]).html(element.name)
            $(card[0].childNodes[1].childNodes[3]).html(element.description)
            $(card[0].childNodes[1].childNodes[5]).attr('href', element.html_url)
            $(card[0].childNodes[1].childNodes[5]).html('Check it out on GitHub')
            $(injector).append(newCard);
        })
    }

    function fadeIn(element) {
        $(element).removeAttr('hidden')
        var op = 0.01; // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 100);
    }

    $(document).ready(function () {
        fadeIn(document.getElementById('header-fade-in'))
        getRepositories()

        $(btnJavascript).on('click', () => {
            $('#card-injector-js').toggle();
        })
        $(btnSql).on('click', () => {
            $('#card-injector-sql').toggle();
        })
        $(btnAngularNode).on('click', () => {
            $('#card-injector-ng').toggle();
        })
    })
})(jQuery);