import React from 'react';
import Banner from '../../components/Banner/Banner';
import Philosophy from '../../components/Philosophy';
import JustTake from '../../components/JustTake';
import JoinCom from '../../components/JoinCom';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Philosophy></Philosophy>
            <JustTake></JustTake>
            <JoinCom></JoinCom>
        </div>
    );
};

export default Home;