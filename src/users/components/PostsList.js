import PostItem from "./PostItem";
import './UserList.css';

const PostsList = props => {
    // if(props.posts.length === 0) {
    //     return (
    //     <div>
    //         <Card >
    //         <h2>No posts found.</h2>
    //         </Card>
    //     </div>
    //     );
    // }

    return (
        //<h2>hello</h2>
        <ul className="users-list">
            {props.posts?.map(post => {
                return <PostItem 
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                />
            })}
        </ul>
    );
};

export default PostsList;