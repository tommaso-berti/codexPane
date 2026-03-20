# 7. API CALL


## Example of an API call


```
const tmdbKey =’personal API key’;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

const getGenres = () => {
  const genreRequestEndpoint = 'genre/movie/list';
  const requestParams = `?api_key=tmdbKey`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams
};

```


**Query strings** start out with a question mark ?, followed by the key/value pairs. The format looks like this:

```
const queryString = `?${key}=${value}`;

```


**Query strings** with two parameters is composed by key/value pairs connected by the **&** char

```
`?api_key=${tmdbKey}&with_genres=${selectedGenre}`

```

