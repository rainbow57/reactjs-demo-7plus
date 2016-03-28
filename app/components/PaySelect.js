/**
 * Created by hammer on 2016/3/26.
 */
'use strict';
import {render} from 'react-dom';
import React  from 'react';
//import  {Button,ButtonToolbar,Icon,ButtonGroup} from'amazeui-react';
import {
    AppBar,
    RaisedButton,
    IconButton,
    Paper,
    TextField,
    Divider,
    List,
    Subheader,
    ListItem,
    Checkbox
}from 'material-ui';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FontIcon from 'material-ui/lib/font-icon';
const Weixin_url = 'https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_1';
const Zhifubao_url='https://b.alipay.com/order/productDetail.htm?productId=2015110218008816';

export default class  PaySelect extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            disPay:false,
            selected:1,
            checkedWeixin:true,
            checkedZhifubao:false,
        }
    }

    _clickClose(){
        console.log("点击关闭本页")
    }

    render(){
        return(
            <div>
                <AppBar
                    title={<span style={styles.title}>付费</span>}
                    iconElementLeft={<IconButton onMouseEnter={e=>console.log("icon mouse enter")}><NavigationClose /></IconButton>}
                    onLeftIconButtonTouchTap={e=>{this._clickClose()}}


                >
                </AppBar>

                <Paper zDepth={2} style={styles.paper} >
                    <List>
                        <Subheader>价格</Subheader>
                        <Divider/>
                        <ListItem primaryText='购买数量' rightToggle={<h2>1</h2>}/>
                        <Divider/>
                        <ListItem primaryText='项目单价' rightToggle={<h2>55元</h2>}/>
                        <Divider/>
                        <ListItem primaryText='总价' rightToggle={<h2>55元</h2>}/>
                    </List>
                </Paper>
                <Paper zDepth={2} style={styles.paper} >
                    <List>
                        <Subheader>选择支付方式</Subheader>
                        <Divider/>
                        <ListItem leftIcon={<img src='./img/logo.png'/>}  primaryText='微信'
                                  rightToggle={<Checkbox checked={this.state.checkedWeixin}
                                  onCheck={e=>{
                                   console.log("选择了微信");
                                   this._checkWeixin();
                                   }}
                                  />}/>
                        <Divider/>
                        <ListItem  leftIcon={<img src='./img/logo.png'/>} primaryText='支付宝'
                                   rightToggle={<Checkbox checked={this.state.checkedZhifubao}  onCheck={e=>{
                                   console.log("选择了支付宝");
                                   this._checkZhifubao();
                                   }}
                                   />}/>
                    </List>
                </Paper>

                <div style={styles.button}>
                    <RaisedButton label="确认支付"
                                  disabled={this.state.disPay}
                                  primary={true}
                                  fullWidth={true}
                                  linkButton={true}
                                  href={this.state.checkedWeixin?Weixin_url:Zhifubao_url}
                                  onMouseEnter={e=>{
                                  let msg = this.state.checkedWeixin?'微信':"支付宝";
                                  console.log("go to"+msg);
                                  }}
                    />
                </div>

            </div>
        );
    }
    _checkWeixin(){
        this.setState({
            checkedWeixin:true,
            checkedZhifubao:false,
        });
    }
    _checkZhifubao(){
        this.setState({
            checkedWeixin:false,
            checkedZhifubao:true,
        });
    }

}

const styles = {
    title: {
        cursor: 'pointer',
    },
    listitem:{
        marginLeft:20,
    },
    paper:{
        marginTop:20,
        marginLeft:20,
        marginRight:20,
    },
    button:{
        marginTop:40,
        marginLeft:20,
        marginRight:20,
    }
};

