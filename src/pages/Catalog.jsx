import React from "react";
import { useParams } from "react-router-dom";
import { category as Category } from "../api/tmdbApiConfig";
import PageHeader from "../components/pageHeader/PageHeader";
import MovieGrid from "../components/movieGrid/MovieGrid";

const Catalog = () => {
  const { category } = useParams();
  console.log(category);
  return (
    <>
      <PageHeader>
        {category === Category.movie ? "Movies" : "TV Series"}
      </PageHeader>
      <MovieGrid category={category} />
    </>
  );
};

export default Catalog;
