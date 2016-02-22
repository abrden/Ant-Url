'use strict';

module.exports = function (app, db) {
    
    app.route('/:query')
        .get(function(req, res) {
            var url = process.env.APP_URL + req.params.query;
            findURL(url, db, res);
    });
    
    function findURL(url, db, res) {
        var results = db.collection('urls');
        results.findOne({
            "short_url": url
        }, function(err, result) {
            if (err) throw err;
            
            if (result) {
                // Test comment
                console.log('Found ' + result);
                res.redirect(result.original_url);
            }
        });
    }
    
    app.get('/new/:query', function(req, res) {
        
        var url = req.params.query;
        var result = {};
        
        if (validURL(url)) {
            result = {
                "original_url": url,
                "short_url": process.env.APP_URL + generateAntUrl(db)
            };
            
            saveResult(db, result);
        
        } else {
            result = {
                "error": "Ant-Url could not be generated because original url is not valid."
            };
        }
        
        res.send(result);
        
    });

    function validURL(url) {
        // Regex from https://gist.github.com/dperini/729294
        var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        return regex.test(url);
    }
    
    function generateAntUrl(db) {
        // Turn number of results to hexa to generate a unique and short id
        return db.collection('urls').length.toString(16);
    }
    
    function saveResult(db, result) {
        var results = db.collection('urls');
        results.save(result, function(err, data) {
            if (err) throw err;
            // Test comment
            console.log('Saved ' + data);
        });
    }
    
};