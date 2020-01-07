import React, {Component} from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import TimeSeriesSparkLineScatterPlot from '../components/chart'
import HorizonChart from '../components/chart2'
import { json } from 'd3-fetch'

import dataJson from "../data/stockQuotes.json";

const Home = props => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <HorizonChart data={props.data}/>        

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
    `}</style>
  </div>
);

Home.getInitialProps = async function() {
  let data = dataJson.dataSet;
  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    data: data
  };
};

export default Home;