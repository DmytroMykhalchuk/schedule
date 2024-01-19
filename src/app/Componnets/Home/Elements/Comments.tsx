import { CommentItem } from "./CommentItem";

type CommentsType = {
};


export const Comments: React.FC<CommentsType> = ({ }) => {
    const data = [
        {
            image: 'https://source.unsplash.com/random?men&1',
            name: "Andriy",
            message: "Lorem ipsum dolor sit amet. Consectetur adipicings elit!",
            projectName: "Market research",
        },
        {
            image: 'https://source.unsplash.com/random?men&2',
            name: "Mike",
            message: "Clarior est solito post maxima nebula.",
            projectName: "Weekend",
        }
    ]

    return (
        <>
            {data.map((item, index) => (
                <CommentItem
                    key={index}
                    message={item.message}
                    personName={item.name}
                    projectName={item.projectName}
                    avatar={item.image}
                />
            ))}
        </>
    );
};