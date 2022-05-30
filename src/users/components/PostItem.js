import Card from "../../shared/components/UIElements/Card";
import './UserItem.css';

const PostItem = props => {
    return (
        <li className='user-item'>
            <Card className='user-item__content'>
                <div className='user-item__info'>
                    <h2>Title: {props.title}</h2>
                    <h2>Description: {props.description}</h2>
                </div>
            </Card>
        </li>
    );
};

export default PostItem;