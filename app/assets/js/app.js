import $ from 'jquery';

import Injector          from './modules/Injector';

import MobileMenu         from './modules/MobileMenu';
import ScrollSpy          from './modules/ScrollSpy';
import StickyHeader       from './modules/StickyHeader';
import FullScreenSection  from './modules/FullScreenSection';

function init () {
    MobileMenu();
    StickyHeader();
    ScrollSpy();
    FullScreenSection('.large-hero')

}

function doNothing () {}

$(document).ready( Injector.bind(window, init) )
