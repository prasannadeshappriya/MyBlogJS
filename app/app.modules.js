/**
 * Created by prasanna_d on 10/24/2017.
 */
const app = angular.module('MyBlog',
    ['ui.router', 'ngStorage', 'ngRoute', 'ngAnimate','ngAria','ngMaterial'])
    .constant(
        'host_url', 'http://localhost:3002/'
        // 'host_url', 'https://trainscheduleserver.herokuapp.com/'
    );

