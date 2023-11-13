import React, {Component} from 'react';
import {decode} from 'html-entities';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Item = (props) => {
  let bg = props.bg;
  let text = props.text;
  let f = props.f;
  let e = props.e;
  let d = props.d;
  let c = props.c;
  let p = props.p;
  let s = props.s;
  let w = props.w;
  let i = props.i;
  let o = props.o;
  let color = 'white';
  let top = 0;
  let left = 0;
  let font = 40;
  if (bg == 'gray' && text == ',') text = '.';
  if (bg == 'white') color = 'black';
  if (bg == 'white') top = -3;
  if (text == '0') left = -50;
  if (bg == 'white' || bg == 'khaki') decode(text);
  if (bg == 'khaki' && props.x == 'tak') top = -9;
  if (bg == 'white' && props.x == 'nie') {
    font = 25;
    top = -1;
  }
  const funkcja = (x) => {
    switch (x) {
      case '&#247;':
        x = '/';
        break;
      case '&#215;':
        x = '*';
        break;
      case '&#150;':
        x = '-';
        break;
      case '&#43;':
        x = '+';
        break;
      case '&#61;':
        x = '=';
        break;
    }

    if (bg == 'gray') {
      f(x);
    } else if (bg == 'white') {
      if (x == 'AC') d();
      if (x == '+/-') c();
      if (x == '&#37;') p();
      if (x == 'Sqrt') s();
      if (x == 'Pow') w();
      if (x == 'Sin') i();
      if (x == 'Cos') o();
    } else if (bg == 'khaki') {
      if (x == '=') {
        e();
      } else {
        f(x);
      }
    }
  };
  return (
    <TouchableOpacity onPress={() => funkcja(text)} style={{flex: 42, backgroundColor: bg, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 50, margin: 8}}>
      <Text style={{fontSize: font, color: color, top: top, left: left}}>{decode(text)}</Text>
    </TouchableOpacity>
  );
};

export default Item;
