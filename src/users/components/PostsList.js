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
        <ul className="users-list">
            {props.posts?.map(post => {
                return <PostItem 
                key={post.id}
                id={post.id}
                title={post.title}
                creatorId={post.creator}
                description={post.description}
                onDelete={props.onDeletePost}
                />
            })}
        </ul>
    );
};

export default PostsList;