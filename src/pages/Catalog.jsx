import React from "react";
import { useParams } from "react-router-dom";
import { category as Category } from "../api/tmdbApiConfig";
import PageHeader from "../components/pageHeader/PageHeader";

const Catalog = () => {
  const { category } = useParams();
  console.log(category);
  return (
    <PageHeader>{category === Category.movie ? "movie" : "tv"}</PageHeader>
  );
};

export default Catalog;
