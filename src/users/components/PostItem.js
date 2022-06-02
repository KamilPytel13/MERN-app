import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
//import './UserItem.css';
import './PostItem.css';

const PostItem = props => {
    // return (
    //     <li className='user-item'>
    //         <Card className='user-item__content'>
    //             <div className='user-item__info'>
    //                 <h2>Title: {props.title}</h2>
    //                 <h2>Description: {props.description}</h2>
    //             </div>
    //         </Card>
    //     </li>
    // );
    return (
        <li className='user-item'>
            {/* <Card className='user-item__content'> */}
            <Card>
                <Button>x</Button>
                <div className="post-content">
                    <h1 className="post-title">Title: {props.title}</h1>
                    <h2>Description: {props.description}</h2>
                </div>
                <Button>Like</Button>
            </Card>
        </li>
    );
};

export default PostItem;