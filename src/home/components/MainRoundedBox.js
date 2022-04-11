import List from './List';

const MainRoundedBox = () => {
    const FEATURES = [
        {
            id: 'f1',
            title: 'Create Posts',
            description: 'You can create posts to announce whatever you like to you neighbours.'
        },
        {
            id: 'f2',
            title: 'Check Events',
            description: 'You can see what is going on in you area!'
        },
        {
            id: 'f3',
            title: 'Read Local News',
            description: 'See the announcements posted by the property management team.'
        }
    ];

    return (
        <List items={FEATURES} />
    );
};

export default MainRoundedBox;