import React, {Component} from 'react';
import './style.css'

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            stars: props.data.stars || 0,
            comment: props.data.comment || ""
        };
    }

    render() {
        const {shop_title, title, coupon_start_fee, pict_url, isCommented} = this.props.data;
        return (
            <div>
                <div className="orderItem">
                    <div className="orderItem_picContainer">
                        {/* orderItem_picContainer--  :BEM  css命名规范 */}
                        <img className="orderItem__pic" src={pict_url} alt="PIC"/>
                    </div>
                    <div className="orderItem__content">
                        <div className="orderItem__product">{title}</div>
                        <div className="orderItem__shop">{shop_title}</div>
                        <div className="orderItem__detail">
                            <div className="orderItem__price">{coupon_start_fee}</div>
                            {isCommented ? (
                                <button className="orderItem__btn orderItem__btn--gray">
                                    已评价
                                </button>
                            ) : (
                                <button
                                    onClick={this.handleOpenEditArea}
                                    className="orderItem__btn orderItem__btn--red"
                                >
                                    评价
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {this.state.editing ? this.renderEditArea() : null}
            </div>
        );
    }

    /** 绘制评价框*/
    renderEditArea() {
        return (
            <div className="orderItem__commentContainer">
        <textarea
            onChange={this.handleCommentChange}
            value={this.state.comment}
            className="orderItem__comment"
        />
                {this.renderStarts()}
                {!this.props.data.isCommented ? (
                    <button
                        className="orderItem__btn orderItem__btn--red"
                        onClick={this.handleSubmitComment}>
                        提交 </button>
                ) : null}
                <button
                    className="orderItem__btn orderItem__btn--gray"
                    onClick={this.handleCancelComment}>
                    取消
                </button>
            </div>
        );
    }

    /** 绘制五角星 */
    renderStarts() {
        const {stars} = this.state;
        return (
            <div>
                {[1, 2, 3, 4, 5].map((item, index) => {
                    const lightClass = stars >= item ? "orderItem__star--light" : "";
                    return (
                        <span
                            key={index}
                            className={"orderItem__star " + lightClass}
                            onClick={this.handleClickStars.bind(this, item)}>
                            ★
                        </span>
                    );
                })}
            </div>
        );
    }

    handleOpenEditArea = () => {
        this.setState({
            editing: true
        });
    };

    handleCommentChange = event => {
        this.setState({
            comment: event.target.value
        });
    };

    handleClickStars = stars => {
        console.log("stars:", stars);
        this.setState({
            stars: stars
        });
    };

    handleCancelComment = () => {
        this.setState({
            editing: false,
            comment: this.props.comment || "",
            stars: this.props.stars || 0
        });
    };

    handleSubmitComment = () => {
        const {item_id} = this.props.data;
        const {comment, stars} = this.state;
        this.setState({
            editing: false
        });

        this.props.onSubmit(item_id, comment, stars);
    };

}

export default OrderItem;