import React from 'react';
import Banner from '../../components/Banner/Banner';
import Philosophy from '../../components/Philosophy';
import JustTake from '../../components/JustTake';
import JoinCom from '../../components/JoinCom';
import Bestsellers from './Bestsellers';
import NewArival from './NewArival';
import ShopBy from './ShopBy';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Bestsellers></Bestsellers>
            <ShopBy></ShopBy>
            <NewArival></NewArival>
            <Philosophy></Philosophy>
            <JustTake></JustTake>
            <JoinCom></JoinCom>
        </div>
    );
};

export default Home;