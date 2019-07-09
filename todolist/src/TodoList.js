import React,{Component,Fragment} from 'react';
import TodoItem from './TodoItem'


// 定义一个 React 组件
class TodoList extends Component {
    // 生命周期，页面创建的时候调用
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            inputValue: ''
        }
        //先提前给函数绑定this，提高性能
        this.handleBthClick = this.handleBthClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /** 添加input值到列表里面*/
    handleBthClick() {
        /** 这里要用setState，不能直接操作state*/
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        })
    }

    /** 获取input值并绑定到对象上*/
    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        });
        console.log(e.target.value);
    }

    /** 点击列表里的值时删除该值*/
    handleItemClick(index) {
        // this.state.list.splice(index,1)
        // 上面的方法也有效，但是不建议直接操作数据，性能会比较查，如果排错麻烦，建议复制一个副本进行操作
        const list = [...this.state.list];
        list.splice(index, 1);
        this.setState({
            // list:list
            // es6语法中，如果ket和value是相同的，可以省略
            list
        })
    }

    /** 传递函数给子组件执行*/
    handleDelete(index) {
        const list = [...this.state.list];
        list.splice(index, 1);
        this.setState({
            list
        })
    }

    // 把dom抽取出来到函数上
    getTodoItems() {
        return (
            this.state.list.map((item, index) => {
                return (
                    <TodoItem deleteItem={this.handleDelete} key={index} content={item} index={index}/>
                )
            })
        )
    }

    // 下面函数需要用bind绑定this,不然函数里面调用的this会指向dom也就是button的this
    // 遍历的时候需要给个key值(一般用index代替)，不然会报错。
    // onChange 每当input值发生改变时，触发函数，函数里面的e可以获取到input里面的值
    // 父组件通过属性的形式向子组件传递参数
    // 子组件通过props的形式接收父组件传递过来的参数
    // react还可以传递函数给子组件
    render() {
        // jsx语法
        return (
            <Fragment> {/*这里会占用一个div标签位置，我们可以通过React.Fragment替换*/}
                <div>
                    {/*<input value={this.state.inputValue} onChange={this.handleInputChange.bind(this)}/>*/}
                    <input value={this.state.inputValue} onChange={this.handleInputChange}/>
                    {/*<button style={{background: 'red', color: '#fff'}} onClick={this.handleBthClick}>add</button>*/}
                    <button className='red-bth' onClick={this.handleBthClick}>add</button>

                </div>
                <ul>
                    {this.getTodoItems()}
                    {/*{this.state.list.map((item, index) => {*/}
                    {/*    return (*/}
                    {/*        <TodoItem deleteItem={this.handleDelete} key={index} content={item} index={index}/>*/}
                    {/*    )*/}
                    {/*    return <li key={index} onClick={this.handleItemClick.bind(this, index)}>{item}</li>*/}
                    {/*})}*/}

                </ul>
            </Fragment>
        );
    }
}


export default TodoList;
