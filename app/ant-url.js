'use strict';

module.exports = function (app, db) {
    
    var appURL = process.env.APP_URL || 'https://url-shortener-microservice-abrden.c9users.io/';
    
    app.get('/:id', function(req, res) {
        var id = req.params.id;
        var url = appURL + id;
        if (url != appURL + 'favicon.ico') findURL(id, db, res);
    });
    
    function findURL(id, db, res) {
        var urls = db.collection('urls');
        urls.findOne({
            'id': id
        }, function(err, result) {
            if (err) throw err;
            
            if (result) {
                console.log('Found');
                res.redirect(result.url);
            }
        });
    }
    
    app.get('/new/:url*', function(req, res) {
        var url = req.url.slice(5);
        
        if (validURL(url)) {

            var id = generateAntUrl(db);
            saveResult(db, id, url);
            res.json({
                'original-url': url,
                'ant-url': appURL + id
            });
        
        } else {
            res.json({
                'error': 'Ant-Url could not be generated because original url is not valid.'
            });
        }
        
    });

    function validURL(url) {
        // Regex from https://gist.github.com/dperini/729294
        var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        return regex.test(url);
    }
    
    function generateAntUrl(db) {
        // Knowing that decimal 16777215 == ffffff
        return Math.floor(Math.random()*16777215).toString(16);
    }

    function saveResult(db, id, url) {
        db.collection('urls').save({
            'id': id,
            'url': url
        }, function(err, data) {
            if (err) throw err;
            console.log('Saved');
        });
    }
    
};