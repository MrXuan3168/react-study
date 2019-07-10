import React, {Component} from 'react';
import OrderItem from '../OrderItem'

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch("./mock/orders.json").then(res => {
            if (res.ok) {
                res.json().then(data => {
                    this.setState({
                        data: data.data.result_list.map_data
                    });
                }).catch(error => console.error("请求数据失败a: ", error));
            }
        }).catch(error => console.error("请求数据失败b: ", error));
    }

    render() {
        return (
            <div>
                {this.state.data.map(item => {
                    return (
                        <OrderItem
                            key={item.item_id}
                            data={item}
                            onSubmit={this.handleSubmit}
                        />
                    );
                })}
            </div>
        );
    }

    handleSubmit = (item_id, comment, stars) => {
        // fetch("/saveComment").then(() => {});
        const newDate = this.state.data.map(item => {
            return item.item_id === item_id
                ? {
                    ...item,
                    comment,
                    stars,
                    isCommented: true
                }
                : item;
        });
        this.setState({
            data: newDate
        });
    };
}

export default OrderList;