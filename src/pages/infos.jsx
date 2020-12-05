import React from 'react';
import { Page, Navbar, NavRight, NavLeft, Link, Block, BlockTitle, NavTitle } from 'framework7-react';
import WikiInfo from '../components/wikiInfo/wikiInfo';

export default () => (
    <Page>
        <Navbar title='Informationen'>
            <img src='../static/icons/dhbw.png' class='logo' slot='right' ></img>
        </Navbar>
        <BlockTitle>Wikipedia Infos</BlockTitle>
        <WikiInfo locationName="Ravensburg"></WikiInfo>
    </Page>
);