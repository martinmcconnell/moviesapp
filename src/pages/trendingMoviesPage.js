import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getTrending} from '../api/tmdb-api'
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'

const trendingMoviesPage = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data, error, isLoading, isError}  = useQuery('upcoming', getTrending)

    if (isLoading) {
        return <Spinner />;
      }
    
      if (isError) {
        return <h1>{error.message}</h1>;
      }
    const movies = data.results;

    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    const mustWatch = movies.filter(m => m.mustWatch)
    localStorage.setItem('mustWatch', JSON.stringify(mustWatch))

    return (
        <PageTemplate
            title="Trending Movies"
            movies={movies}
            action={(movie) => {
                return <AddToPlaylistIcon movie={movie} />
            }}
        />
    );
};
export default trendingMoviesPage; 