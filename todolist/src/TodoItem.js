import React, {Component} from 'react'

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // 子组件如果想和父组件通信，子组件要调用父组件传递过来的方法
    handleDelete() {
        const {deleteItem, index} = this.props;
        // 打印父组件传过过来的下标
        console.log(this.props.index);
        // 调用父组件传递过来的方法；
        deleteItem(index)
    };

    render() {
        const {content} = this.props;
        return (
            <div onClick={this.handleDelete}>{content}</div>
        )
    }
}

export default TodoItem;