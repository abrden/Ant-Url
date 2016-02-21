# ant-url
## API: URL Shortener Microservice
[FCC API Projects Challenge](http://www.freecodecamp.com/challenges/url-shortener-microservice)

## User Stories
- [x] I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- [x] If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- [x] When I visit that shortened URL, it will redirect me to my original link.

## Example usage
`https://abrden-ant-url.herokuapp.com/new/http://freecodecamp.com/news`

## Example output
`{ "original_url": "http://freecodecamp.com/news", "short_url": "https://abrden-ant-url.herokuapp.com/4" }`

## Live site
<https://abrden-ant-url.herokuapp.com>
