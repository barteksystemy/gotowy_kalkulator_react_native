import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {useState, useEffect} from 'react';
import {decode} from 'html-entities';
import Item from './components/Item';
import {Dimensions} from 'react-native';

const App = () => {
  const [state, setState] = useState({
    string: '0',
  });

  const isPortrait = () => {
    let dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  const [orient, setOrient] = useState({
    orientation: isPortrait(),
  });

  useEffect(() => {
    const dimensionsChangeListener = () => {
      setOrient({
        orientation: isPortrait(),
      });
    };

    Dimensions.addEventListener('change', dimensionsChangeListener);

    return () => {
      Dimensions.removeEventListener('change', dimensionsChangeListener);
    };
  }, []);

  let tab0 = [
    ['white', 'AC'],
    ['white', '+/-'],
    ['white', '&#37;'],
  ];
  let tab1 = [
    ['gray', '7'],
    ['gray', '8'],
    ['gray', '9'],
    ['gray', '4'],
    ['gray', '5'],
    ['gray', '6'],
    ['gray', '1'],
    ['gray', '2'],
    ['gray', '3'],
    ['gray', '0'],
    ['gray', ','],
  ];
  let tab2 = [
    ['khaki', '&#247;'],
    ['khaki', '&#215;'],
    ['khaki', '&#150;'],
    ['khaki', '&#43;'],
    ['khaki', '&#61;'],
  ];
  let tab3 = [
    ['white', 'Sqrt'],
    ['white', 'Pow'],
    ['white', 'Sin'],
    ['white', 'Cos'],
  ];

  const func = (x) => {
    let z = '';
    switch (x) {
      case '/':
        z = '&#247;';
        break;
      case '*':
        z = '&#215;';
        break;
      case '-':
        z = '&#150;';
        break;
      case '+':
        z = '&#43;';
        break;
      case '.':
        z = '.';
        break;
    }
    // console.log(x);
    if (z != '&#247;' && z != '&#215;' && z != '&#150;' && z != '&#43;' && z != '.') {
      if (state.string == '0' && x != '.') {
        setState({string: x});
      } else {
        setState((prevState) => ({
          string: prevState.string + x,
        }));
      }
    } else {
      let s = state.string.slice(-1);
      if (s == '+' || s == '-' || s == '*' || s == '/' || s == '.') {
        setState((prevState) => ({
          string: prevState.string.slice(0, -1) + x,
        }));
      } else {
        setState((prevState) => ({
          string: prevState.string + x,
        }));
      }
    }
  };
  const equal = () => {
    let x = state.string.slice(-1);
    if (x != '+' && x != '-' && x != '*' && x != '/' && x != '.') {
      setState((prevState) => ({
        string: eval(prevState.string).toString(),
      }));
    }
  };
  const del = () => {
    setState({string: '0'});
  };
  const change = () => {
    if (state.string != '0') {
      if (state.string.charAt(0) == '-') {
        setState((prevState) => ({
          string: prevState.string.substring(1),
        }));
      } else {
        setState((prevState) => ({
          string: '-' + prevState.string,
        }));
      }
    }
  };
  const procent = () => {
    setState({string: (parseInt(state.string) * 0.01).toString()});
  };
  const sqrt = () => {
    setState({string: Math.sqrt(state.string).toString()});
  };
  const pow = () => {
    setState({string: (state.string * state.string).toString()});
  };
  const sin = () => {
    setState({string: Math.sin(state.string).toString()});
  };
  const cos = () => {
    setState({string: Math.cos(state.string).toString()});
  };
  // console.log(state.string);
  // background-color, text
  if (orient.orientation) {
    return (
      // Pionowo
      <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <StatusBar />
        <View style={{flex: 14, backgroundColor: 'black', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Text style={{color: 'white', fontSize: 70, paddingLeft: 28, paddingRight: 28}}>{state.string}</Text>
        </View>

        <View
          style={{
            flex: 21,
            backgroundColor: 'black',
            flexDirection: 'row',
          }}>
          <View style={{flex: 3}}>
            <View style={{flex: 6, backgroundColor: 'black', flexDirection: 'row'}}>
              {tab0.map((el, i) => {
                return <Item bg={el[0]} text={el[1]} d={del} c={change} p={procent}></Item>;
              })}
            </View>
            <View style={{flex: 25, flexDirection: 'column'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {tab1.map((el, i) => {
                  while (el[1] == 7 || el[1] == 8 || el[1] == 9) return <Item bg={el[0]} text={el[1]} f={func}></Item>;
                })}
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {tab1.map((el, i) => {
                  while (el[1] == 4 || el[1] == 5 || el[1] == 6) return <Item bg={el[0]} text={el[1]} f={func}></Item>;
                })}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                {tab1.map((el, i) => {
                  while (el[1] == 1 || el[1] == 2 || el[1] == 3) return <Item bg={el[0]} text={el[1]} f={func}></Item>;
                })}
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {tab1.map((el, i) => {
                  while (el[1] == 0 || el[1] == ',') {
                    if (el[1] == 0) {
                      return (
                        <View style={{flex: 100, display: 'flex'}}>
                          <Item bg={el[0]} text={el[1]} f={func}></Item>
                        </View>
                      );
                    } else return <Item bg={el[0]} text={el[1]} f={func}></Item>;
                  }
                })}
              </View>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            {tab2.map((el, i) => {
              return <Item bg={el[0]} text={el[1]} f={func} e={equal}></Item>;
            })}
          </View>
        </View>
      </View>
    );
  } else {
    return (
      // Poziomo
      <View style={{flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'black'}}>
        <StatusBar />

        <View style={{flex: 1, display: 'flex', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Text style={{color: 'white', fontSize: 50, paddingLeft: 28, paddingRight: 69}}>{state.string}</Text>
        </View>
        <View style={{flex: 4, display: 'flex', flexDirection: 'row'}}>
          <View style={{flex: 3, display: 'flex', flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              {tab1.map((el, i) => {
                while (el[1] == 7 || el[1] == 8 || el[1] == 9) return <Item bg={el[0]} text={el[1]} f={func}></Item>;
              })}
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              {tab1.map((el, i) => {
                while (el[1] == 4 || el[1] == 5 || el[1] == 6) return <Item bg={el[0]} text={el[1]} f={func}></Item>;
              })}
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              {tab1.map((el, i) => {
                while (el[1] == 1 || el[1] == 2 || el[1] == 3) return <Item bg={el[0]} text={el[1]} f={func}></Item>;
              })}
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              {tab1.map((el, i) => {
                while (el[1] == 0 || el[1] == ',') {
                  if (el[1] == 0) {
                    return (
                      <View style={{flex: 100, display: 'flex'}}>
                        <Item bg={el[0]} text={el[1]} f={func}></Item>
                      </View>
                    );
                  } else return <Item bg={el[0]} text={el[1]} f={func}></Item>;
                }
              })}
            </View>
          </View>
          <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <View style={{flex: 1, paddingHorizontal: 20}}>
              <Item bg={tab0[0][0]} text={tab0[0][1]} d={del} x='nie'></Item>
              {tab3.map((el, i) => {
                return <Item bg={el[0]} text={el[1]} s={sqrt} w={pow} i={sin} o={cos} x='nie'></Item>;
              })}
            </View>
          </View>
          <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <View style={{flex: 1, paddingHorizontal: 20}}>
              {tab2.map((el, i) => {
                return <Item bg={el[0]} text={el[1]} f={func} e={equal} x='tak'></Item>;
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default App;
