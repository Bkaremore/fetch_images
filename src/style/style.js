import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const Styles = StyleSheet.create({
    inputContainer:{
        borderRadius:5,
        borderColor:'#000',
        borderWidth:1,
        width:width
    }
})