import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'html': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'body': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  '*': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'WebkitTouchCallout': 'none',
    // 系统默认菜单被禁用
    'WebkitUserSelect': 'none',
    // webkit浏览器
    'userSelect': 'none'
  },
  'input': {
    'WebkitUserSelect': 'auto',
    // webkit浏览器
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'outline': 'none'
  },
  'textarea': {
    'WebkitUserSelect': 'auto',
    // webkit浏览器
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'outline': 'none'
  },
  'ul': {
    'listStyle': 'none'
  },
  'li': {
    'listStyle': 'none'
  },
  'a': {
    'color': 'inherit',
    'textDecoration': 'none',
    'WebkitTapHighlightColor': 'rgba(255, 255, 255, 0)',
    'WebkitUserSelect': 'none'
  },
  '#app': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'overflow': 'hidden'
  },
  'c-flex': {
    'display': 'flex'
  },
  'c-flex1': {
    'flex': '1'
  },
  'c-flex2': {
    'flex': '2'
  },
  'c-flex3': {
    'flex': '3'
  },
  'c-flex4': {
    'flex': '4'
  },
  'c-text-center': {
    'textAlign': 'center'
  },
  'c-text-right': {
    'textAlign': 'right'
  },
  'c-r-tip': {
    'textAlign': 'center',
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 0 }],
    // no
  },
  'mint-msgbox-confirm': {
    'backgroundColor': 'rgb(255, 90, 0)',
    'color': '#fff',
    'fontSize': [{ 'unit': 'string', 'value': 'inherit' }]
  }
});
